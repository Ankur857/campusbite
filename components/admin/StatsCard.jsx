"use client";

import Image from "next/image";
import { useOrders } from "@/contexts/OrdersContext";

export default function StatsCard() {
  const { orders, loading } = useOrders();

  // Compute live statistics
  const totalOrders = orders.length;
  
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  
  // Calculate revenue for today (non-cancelled orders)
  const todayStr = new Date().toDateString();
  const revenueToday = orders
    .filter(o => o.status !== "cancelled" && new Date(o.createdAt).toDateString() === todayStr)
    .reduce((sum, o) => sum + parseFloat(o.totalAmount || "0"), 0);

  // Calculate average prep time of current active/non-delivered orders
  const activeOrders = orders.filter(o => o.status !== "delivered" && o.status !== "cancelled");
  let totalPrepTime = 0;
  let itemsCount = 0;
  activeOrders.forEach(o => {
    o.items?.forEach(item => {
      totalPrepTime += (item.food?.prepTime || 10) * item.quantity;
      itemsCount += item.quantity;
    });
  });
  const avgPrep = itemsCount > 0 ? (totalPrepTime / itemsCount).toFixed(1) : "12.0";

  // Let's create the display cards
  const cards = [
    {
      title: "Total Orders",
      value: loading ? "..." : totalOrders.toString(),
      change: `Live`,
      icon: "/orders.svg",
      color: "bg-orange-50 text-orange-700",
      positive: true,
    },
    {
      title: "Pending Orders",
      value: loading ? "..." : pendingOrders.toString(),
      change: pendingOrders > 0 ? "needs attention" : "clear",
      icon: "/porders.svg",
      color: "bg-amber-50 text-amber-700",
      positive: pendingOrders > 0 ? false : null,
    },
    {
      title: "Revenue (Today)",
      value: loading ? "..." : `₹${revenueToday.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      change: "today",
      icon: "/revenue.svg",
      color: "bg-emerald-50 text-emerald-700",
      positive: true,
    },
    {
      title: "Avg Prep Time",
      value: loading ? "..." : `${avgPrep} min`,
      change: "active orders",
      icon: "/atime.svg",
      color: "bg-blue-50 text-blue-700",
      positive: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-gray-150/50 dark:border-zinc-800/80 hover:shadow-md hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between h-40"
        >
          <div className="flex items-center justify-between">
            <div className={`p-3 rounded-2xl ${card.color} border border-orange-100/30 dark:border-zinc-700/30`}>
              <div className="w-6 h-6 flex items-center justify-center font-bold text-xl">
                {card.title === "Total Orders" && "📦"}
                {card.title === "Pending Orders" && "⏳"}
                {card.title === "Revenue (Today)" && "💰"}
                {card.title === "Avg Prep Time" && "⏱"}
              </div>
            </div>

            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                card.positive === true
                  ? "bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/30"
                  : card.positive === false
                  ? "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/30"
                  : "bg-gray-50 dark:bg-zinc-850 text-gray-500 dark:text-zinc-400 border-gray-200 dark:border-zinc-800"
              }`}
            >
              {card.change}
            </span>
          </div>

          <div>
            <p className="text-xs text-gray-450 dark:text-zinc-500 font-bold uppercase tracking-wider">{card.title}</p>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-1 transition-colors duration-300">
              {card.value}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}