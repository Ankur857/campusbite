"use client";

import { useOrders } from "@/contexts/OrdersContext";

export default function TopItems() {
  const { orders, loading } = useOrders();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm h-[400px] flex items-center justify-center text-gray-500 font-semibold animate-pulse border">
        Loading top items...
      </div>
    );
  }

  // Count item quantities sold (excluding cancelled orders)
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
    .map(([name, count]) => ({ name, sold: count }))
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 4);

  const maxSold = sortedItems[0]?.sold || 1;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm h-[400px] border border-gray-100 hover:shadow-md transition-shadow">
      <h2 className="font-semibold text-lg mb-6 text-gray-800">
        Top Performing Items
      </h2>

      {sortedItems.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-sm">
          No items sold yet.
        </div>
      ) : (
        <div className="space-y-6">
          {sortedItems.map((item) => (
            <div key={item.name}>
              <div className="flex justify-between text-sm mb-2 text-gray-700 font-medium">
                <span className="truncate max-w-[170px]">{item.name}</span>
                <span>{item.sold} sold</span>
              </div>

              <div className="w-full bg-slate-100 h-2 rounded-full">
                <div
                  className="bg-orange-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(item.sold / maxSold) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}