"use client";

import { useState } from "react";
import { useOrders } from "@/contexts/OrdersContext";

export default function RecentOrders() {
  const [showModal, setShowModal] = useState(false);
  const { orders } = useOrders();

  const getStatusStyle = (status) => {
    switch (status) {
      case "Preparing":
        return "bg-yellow-100 text-yellow-700";
      case "Ready":
        return "bg-blue-100 text-blue-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      {/* Recent Orders Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Orders
          </h2>

          <button
            onClick={() => setShowModal(true)}
            className="text-orange-700 font-medium hover:underline"
          >
            View All
          </button>
        </div>

        {/* Scrollable Table */}
        <div className="flex-1 overflow-y-auto">
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
              {orders.slice(0, 5).map((order, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 font-medium text-gray-800">
                    {order.id}
                  </td>

                  <td className="p-4 text-gray-700">
                    {order.customer}
                  </td>

                  <td className="p-4 text-gray-700">
                    {order.item}
                  </td>

                  <td className="p-4 font-semibold text-gray-800">
                    {order.total}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl max-h-[80vh] rounded-2xl p-6 flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800">
                All Orders
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Table */}
            <div className="flex-1 overflow-y-auto border border-gray-100 rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider sticky top-0">
                  <tr>
                    <th className="text-left p-4 font-semibold">
                      Order ID
                    </th>
                    <th className="text-left p-4 font-semibold">
                      Customer
                    </th>
                    <th className="text-left p-4 font-semibold">
                      Item
                    </th>
                    <th className="text-left p-4 font-semibold">
                      Amount
                    </th>
                    <th className="text-left p-4 font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {orders.map((order, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4 text-gray-800">
                        {order.id}
                      </td>

                      <td className="p-4 text-gray-700">
                        {order.customer}
                      </td>

                      <td className="p-4 text-gray-700">
                        {order.item}
                      </td>

                      <td className="p-4 font-medium text-gray-800">
                        {order.total}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-100 text-right text-sm text-gray-500">
              Total Orders: <span className="font-semibold text-gray-800">{orders.length}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}