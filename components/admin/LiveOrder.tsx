"use client"
import React, { useState, useEffect } from "react";
import { useOrders } from "@/contexts/OrdersContext";

interface LiveOrder {
  id: string;
  customerName: string;
  foodItem: string;
  amount: number;
  token?: string;
  status: "new" | "preparing" | "ready";
  preparationTime?: number;
  estimatedTime?: number;
  progress?: number;
  pickupDetails?: string;
  time: string;
};

const topSellingItems = [
  { name: "Chicken Biryani", sold: 45, percentage: 25 },
  { name: "Veg Pulao", sold: 38, percentage: 21 },
  { name: "Paneer Tikka", sold: 32, percentage: 18 },
  { name: "Fried Rice", sold: 28, percentage: 16 },
  { name: "Dal Makhani", sold: 22, percentage: 12 },
];

const notifications = [
  { id: 1, message: "New order received from Canteen A", time: "2 mins ago" },
  { id: 2, message: "Order ORD-003 will be ready in 1 min", time: "1 min ago" },
  { id: 3, message: "Order ORD-004 picked up", time: "3 mins ago" },
];

const alerts = [
  { id: 1, item: "Chicken", level: "Low", color: "text-amber-600" },
  { id: 2, item: "Paneer", level: "Medium", color: "text-yellow-600" },
  { id: 3, item: "Rice", level: "Full", color: "text-green-600" },
];

export default function LiveOrder() {
  const { orders: contextOrders, updateOrderStatus } = useOrders();
  const [liveOrders, setLiveOrders] = useState<LiveOrder[]>([]);

  // Convert context orders to live orders format
  useEffect(() => {
    const converted: LiveOrder[] = contextOrders.map((order) => {
      let status: LiveOrder["status"] = "new";
      if (order.status === "preparing") status = "preparing";
      if (order.status === "ready") status = "ready";
      if (order.status === "delivered") return null;
      
      return {
        id: order.id,
        customerName: order.customerName,
        foodItem: order.foodItem,
        amount: order.amount,
        token: status !== "new" ? `TKN-${order.id.replace("#", "").padStart(3, "0")}` : undefined,
        status,
        preparationTime: status === "preparing" ? Math.floor(Math.random() * 10) : undefined,
        estimatedTime: status === "preparing" ? 10 : undefined,
        progress: status === "preparing" ? Math.floor(Math.random() * 100) : 0,
        pickupDetails: status === "ready" ? "Counter 1" : undefined,
        time: order.time,
      };
    }).filter((order): order is LiveOrder => order !== null);
    setLiveOrders(converted);
  }, [contextOrders]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveOrders((prev) =>
        prev.map((order) => {
          if (order.status === "preparing" && order.progress !== undefined) {
            const newProgress = Math.min(order.progress + 1, 100);
            return { ...order, progress: newProgress };
          }
          return order;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const markAsReady = (id: string) => {
    updateOrderStatus(id, "ready");
  };

  const markHandoverComplete = (id: string) => {
    updateOrderStatus(id, "delivered");
  };

  const newOrders = liveOrders.filter((o) => o.status === "new");
  const preparingOrders = liveOrders.filter((o) => o.status === "preparing");
  const readyOrders = liveOrders.filter((o) => o.status === "ready");
  const completedOrders = 128 - liveOrders.length;

  return (
    <div className="flex-1 flex flex-col p-8 overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Live Order Dashboard</h1>
            <p className="text-gray-500 mt-1">Managing active orders across campus outlets</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl border border-gray-100 shadow-sm">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="font-semibold text-gray-800">Kitchen Live</span>
          </div>
        </div>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {[
          { label: "Total Orders Today", value: "128", color: "bg-orange-50 text-orange-700" },
          { label: "Orders in Progress", value: preparingOrders.length.toString(), color: "bg-amber-50 text-amber-700" },
          { label: "Ready for Pickup", value: readyOrders.length.toString(), color: "bg-green-50 text-green-700" },
          { label: "Completed Orders", value: completedOrders.toString(), color: "bg-blue-50 text-blue-700" },
          { label: "Revenue Today", value: "₹38,420", color: "bg-emerald-50 text-emerald-700" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 overflow-hidden">
        {/* Kanban Columns */}
        <div className="lg:col-span-3 flex gap-6">
          {/* New Orders */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-4 flex-shrink-0">
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">NEW ORDERS</span>
              <span className="text-gray-500 font-medium">{newOrders.length}</span>
            </div>
            <div className="overflow-y-auto space-y-4 pr-2 max-h-[600px]">
              {newOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex-shrink-0">
                  <p className="text-xs text-gray-400 mb-2">{order.id} • {order.time}</p>
                  <p className="font-semibold text-gray-900 mb-1">{order.customerName}</p>
                  <p className="text-gray-600 mb-4">{order.foodItem}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-orange-700">₹{order.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preparing */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-4 flex-shrink-0">
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">PREPARING</span>
              <span className="text-gray-500 font-medium">{preparingOrders.length}</span>
            </div>
            <div className="overflow-y-auto space-y-4 pr-2 max-h-[600px]">
              {preparingOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex-shrink-0">
                  <p className="text-xs text-gray-400 mb-2">{order.id} • {order.time}</p>
                  <p className="text-gray-600 mb-1">{order.foodItem}</p>
                  <p className="text-xl font-bold text-gray-900 mb-4">₹{order.amount}</p>
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                      <span>Prep Time: {order.preparationTime} mins</span>
                      <span>{order.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${order.progress}%` }}></div>
                    </div>
                  </div>
                  <button
                    onClick={() => markAsReady(order.id)}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-xl font-semibold transition-colors mt-3"
                  >
                    Mark as Ready
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Ready for Pickup */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-4 flex-shrink-0">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">READY FOR PICKUP</span>
              <span className="text-gray-500 font-medium">{readyOrders.length}</span>
            </div>
            <div className="overflow-y-auto space-y-4 pr-2 max-h-[600px]">
              {readyOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex-shrink-0">
                  <p className="text-xs text-gray-400 mb-2">{order.id} • {order.time}</p>
                  <p className="font-semibold text-gray-900 mb-1">{order.customerName}</p>
                  <p className="text-orange-600 font-semibold mb-2">{order.token}</p>
                  <p className="text-sm text-gray-500 mb-4">Pickup at: {order.pickupDetails}</p>
                  <button
                    onClick={() => markHandoverComplete(order.id)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-semibold transition-colors"
                  >
                    Handover Complete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Top Selling Items */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Top Selling Items</h3>
            <div className="space-y-3">
              {topSellingItems.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.sold} sold</p>
                  </div>
                  <p className="text-orange-600 font-semibold">{item.percentage}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Recent Notifications</h3>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div key={notif.id} className="pb-3 border-b border-gray-100 last:border-0">
                  <p className="text-sm text-gray-800">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Kitchen Alerts */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Low Stock Warnings</h3>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between">
                  <p className="text-sm text-gray-800">{alert.item}</p>
                  <p className={`text-sm font-semibold ${alert.color}`}>{alert.level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
