"use client";

import { useOrders } from "@/contexts/OrdersContext";

export default function TopItems() {
  const { orders, loading } = useOrders();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-5 h-[320px] flex items-center justify-center text-gray-500 font-semibold animate-pulse">
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
    const colors = ["bg-orange-700", "bg-orange-600", "bg-amber-500", "bg-yellow-500"];
    return {
      name: item.name,
      orders: item.orders,
      width: `${(item.orders / maxOrders) * 100}%`,
      color: colors[index % colors.length]
    };
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 h-fit border border-gray-100 hover:shadow-md transition-shadow">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        Top Items
      </h2>

      {items.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-sm">
          No items sold yet.
        </div>
      ) : (
        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm font-medium mb-2 text-gray-700">
                <span className="truncate max-w-[180px]">{item.name}</span>
                <span>{item.orders} orders</span>
              </div>

              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`${item.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: item.width }}
                />
              </div>
            </div>
          ))}

          <div className="mt-10 bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="text-sm text-gray-700">
              🔥 <strong>"{items[0].name}"</strong> is currently the student favorite, leading with {items[0].orders} orders today!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}