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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-6">
            <div className={`p-3.5 rounded-xl ${card.color}`}>
              {/* Optional fallback icon if svg isn't found, or display as image */}
              <div className="w-6 h-6 flex items-center justify-center font-bold text-lg">
                {card.title === "Total Orders" && "📦"}
                {card.title === "Pending Orders" && "⏳"}
                {card.title === "Revenue (Today)" && "💰"}
                {card.title === "Avg Prep Time" && "⏱"}
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                card.positive === true
                  ? "bg-green-100 text-green-700"
                  : card.positive === false
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {card.change}
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-1.5">{card.title}</p>

          <h2 className="text-3xl font-bold text-gray-800">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}