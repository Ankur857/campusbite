"use client";

import { useState } from "react";
import { useOrders } from "@/contexts/OrdersContext";
import { Calendar, Receipt, User, ArrowRight } from "lucide-react";

function formatOrderId(order) {
  if (order.dailyOrderId) return `#${order.dailyOrderId}`;
  return `#${order.id.slice(0, 8).toUpperCase()}`;
}

function formatCustomer(order) {
  return order.user?.name || "Guest";
}

function formatItems(order) {
  if (!order.items?.length) return "—";
  return order.items
    .map((item) => {
      const name = item.food?.name || "Item";
      return item.quantity > 1 ? `${name} (×${item.quantity})` : name;
    })
    .join(", ");
}

function formatTotal(order) {
  return `₹${parseFloat(order.totalAmount || 0).toFixed(0)}`;
}

function formatStatus(status) {
  const labels = {
    pending: "Pending",
    confirmed: "Confirmed",
    preparing: "Preparing",
    ready: "Ready for pickup",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return labels[status] || status;
}

function getStatusStyle(status) {
  switch (status) {
    case "pending":
    case "confirmed":
      return "bg-yellow-50 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/30";
    case "preparing":
      return "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/30";
    case "ready":
      return "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/30";
    case "delivered":
      return "bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/30";
    case "cancelled":
      return "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/30";
    default:
      return "bg-gray-50 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-zinc-700";
  }
}

function OrderTable({ orders, emptyMessage }) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-400 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-150/50 dark:border-zinc-800/80">
        <span className="text-3xl mb-2">📥</span>
        <p className="text-sm font-semibold">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50 dark:bg-zinc-950/50 border-b border-gray-150/50 dark:border-zinc-800/80 text-gray-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider sticky top-0">
          <tr>
            <th className="text-left px-6 py-4">Order ID</th>
            <th className="text-left px-6 py-4">Customer</th>
            <th className="text-left px-6 py-4">Food Items</th>
            <th className="text-left px-6 py-4">Total</th>
            <th className="text-left px-6 py-4">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/30 transition-colors">
              <td className="px-6 py-4 font-bold text-gray-900 dark:text-white text-sm">
                {formatOrderId(order)}
              </td>

              <td className="px-6 py-4 text-sm text-gray-700 dark:text-zinc-300 font-medium">
                {formatCustomer(order)}
              </td>

              <td className="px-6 py-4 text-sm text-gray-500 dark:text-zinc-400 max-w-xs truncate" title={formatItems(order)}>
                {formatItems(order)}
              </td>

              <td className="px-6 py-4 font-bold text-gray-950 dark:text-zinc-100 text-sm">
                {formatTotal(order)}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {formatStatus(order.status)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function RecentOrders() {
  const [showModal, setShowModal] = useState(false);
  const { orders, loading } = useOrders();

  const recentOrders = orders.slice(0, 5);

  return (
    <>
      <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-gray-150/50 dark:border-zinc-800/85 overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow duration-300">
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 dark:border-zinc-800/60">
          <h2 className="text-xl font-bold text-gray-950 dark:text-white tracking-tight flex items-center gap-2">
            <span>Recent Orders</span>
            <span className="text-xs bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400 px-2 py-0.5 rounded-md font-bold border border-orange-100/30">
              Live
            </span>
          </h2>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1 text-sm text-orange-600 font-bold hover:text-orange-700 transition cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex flex-1 items-center justify-center p-12 text-gray-500 font-semibold animate-pulse">
              Loading orders...
            </div>
          ) : (
            <OrderTable
              orders={recentOrders}
              emptyMessage="No orders yet. Orders from students will appear here."
            />
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-4xl max-h-[85vh] rounded-3xl p-6 flex flex-col shadow-2xl border border-gray-100 dark:border-zinc-800">
            <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-100 dark:border-zinc-800/60">
              <div>
                <h2 className="text-2xl font-black text-gray-950 dark:text-white tracking-tight flex items-center gap-2">
                  <span>All Canteen Orders</span>
                  <span className="text-xs bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 px-2.5 py-0.5 rounded-full font-bold">
                    {orders.length} total
                  </span>
                </h2>
                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">Review live active and delivered student transactions.</p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 flex items-center justify-center transition-colors text-gray-600 dark:text-zinc-300 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto border border-gray-150/40 dark:border-zinc-800/60 rounded-2xl bg-white dark:bg-zinc-950 shadow-inner">
              {loading ? (
                <div className="flex items-center justify-center p-12 text-gray-500 font-semibold animate-pulse">
                  Loading orders...
                </div>
              ) : (
                <OrderTable
                  orders={orders}
                  emptyMessage="No orders yet."
                />
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800/60 flex items-center justify-between text-sm text-gray-500 dark:text-zinc-455">
              <span className="font-medium">Showing completed and pending orders</span>
              <span className="font-bold text-gray-800 dark:text-zinc-200 bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400 px-3 py-1 rounded-xl border border-orange-100/30">
                Total Orders: {orders.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
