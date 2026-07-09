"use client";

import { useOrders } from "@/contexts/OrdersContext";
import { Sparkles } from "lucide-react";

export default function TopItems() {
  const { orders, loading } = useOrders();

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-gray-150/50 p-6 h-[320px] flex items-center justify-center text-gray-500 font-semibold animate-pulse shadow-sm">
        Loading top items...
      </div>
    );
  }

  // Aggregate ordered items
  const itemCounts = {};
  orders.forEach(order => {
    if (order.status !== "cancelled") {
      order.items?.forEach(item => {
        const name = item.food?.name || "Unknown Item";
        itemCounts[name] = (itemCounts[name] || 0) + item.quantity;
      });
    }
  });

  const sortedItems = Object.entries(itemCounts)
    .map(([name, count]) => ({ name, orders: count }))
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 4);

  const maxOrders = sortedItems[0]?.orders || 1;

  const items = sortedItems.map((item, index) => {
    // Beautiful human-curated gradient colors
    const colors = [
      "from-orange-500 to-red-500",
      "from-amber-500 to-orange-500",
      "from-yellow-400 to-amber-500",
      "from-yellow-300 to-yellow-450",
    ];
    return {
      name: item.name,
      orders: item.orders,
      width: `${(item.orders / maxOrders) * 100}%`,
      color: colors[index % colors.length]
    };
  });

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm p-6 border border-gray-150/50 dark:border-zinc-800/80 hover:shadow-md transition-shadow duration-300">
      <h2 className="text-xl font-bold mb-6 text-gray-950 dark:text-white tracking-tight transition-colors duration-300">
        Top Selling Items
      </h2>

      {items.length === 0 ? (
        <div className="text-center py-12 text-gray-400 dark:text-zinc-500 text-sm">
          No items sold yet.
        </div>
      ) : (
        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm font-semibold text-gray-700 dark:text-zinc-300">
                <span className="truncate max-w-[180px]">{item.name}</span>
                <span className="text-gray-500 dark:text-zinc-550 text-xs">{item.orders} orders</span>
              </div>

              <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${item.color} h-2 rounded-full transition-all duration-700 shadow-sm`}
                  style={{ width: item.width }}
                />
              </div>
            </div>
          ))}

          <div className="mt-8 bg-gradient-to-br from-orange-500/10 to-amber-500/5 dark:from-orange-950/20 dark:to-amber-950/10 rounded-2xl p-4 border border-orange-100/50 dark:border-orange-900/30 flex gap-3 items-start shadow-sm">
            <span className="text-xl mt-0.5">🔥</span>
            <div>
              <p className="text-xs font-bold text-orange-800 dark:text-orange-400 uppercase tracking-wider flex items-center gap-1">
                <span>Student Favorite</span>
                <Sparkles size={12} />
              </p>
              <p className="text-sm text-gray-700 dark:text-zinc-300 font-medium mt-1">
                <strong>"{items[0].name}"</strong> is leading the charts today with {items[0].orders} orders!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}