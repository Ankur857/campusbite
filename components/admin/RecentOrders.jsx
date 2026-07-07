"use client";

import { useState } from "react";
import { useOrders } from "@/contexts/OrdersContext";

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
    ready: "Ready",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return labels[status] || status;
}

function getStatusStyle(status) {
  switch (status) {
    case "pending":
    case "confirmed":
      return "bg-yellow-100 text-yellow-700";
    case "preparing":
      return "bg-amber-100 text-amber-700";
    case "ready":
      return "bg-blue-100 text-blue-700";
    case "delivered":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function OrderTable({ orders, emptyMessage }) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider sticky top-0">
        <tr>
          <th className="text-left p-4 font-semibold">Order ID</th>
          <th className="text-left p-4 font-semibold">Customer</th>
          <th className="text-left p-4 font-semibold">Item</th>
          <th className="text-left p-4 font-semibold">Total</th>
          <th className="text-left p-4 font-semibold">Status</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">
        {orders.map((order) => (
          <tr key={order.id} className="hover:bg-gray-50 transition-colors">
            <td className="p-4 font-medium text-gray-800">
              {formatOrderId(order)}
            </td>

            <td className="p-4 text-gray-700">{formatCustomer(order)}</td>

            <td className="p-4 text-gray-700 max-w-xs truncate" title={formatItems(order)}>
              {formatItems(order)}
            </td>

            <td className="p-4 font-semibold text-gray-800">
              {formatTotal(order)}
            </td>

            <td className="p-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
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
  );
}

export default function RecentOrders() {
  const [showModal, setShowModal] = useState(false);
  const { orders, loading } = useOrders();

  const recentOrders = orders.slice(0, 5);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>

          <button
            onClick={() => setShowModal(true)}
            className="text-orange-700 font-medium hover:underline"
          >
            View All
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex flex-1 items-center justify-center p-8 text-gray-500">
              Loading orders...
            </div>
          ) : (
            <OrderTable
              orders={recentOrders}
              emptyMessage="No orders yet. Orders from the user dashboard will appear here."
            />
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl max-h-[80vh] rounded-2xl p-6 flex flex-col shadow-2xl">
            <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800">All Orders</h2>

              <button
                onClick={() => setShowModal(false)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto border border-gray-100 rounded-lg">
              {loading ? (
                <div className="flex items-center justify-center p-8 text-gray-500">
                  Loading orders...
                </div>
              ) : (
                <OrderTable
                  orders={orders}
                  emptyMessage="No orders yet."
                />
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 text-right text-sm text-gray-500">
              Total Orders:{" "}
              <span className="font-semibold text-gray-800">{orders.length}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
