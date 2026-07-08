"use client"
import React, { useState, useEffect, useMemo } from "react";
import { useOrders } from "@/contexts/OrdersContext";

export default function LiveOrder() {
  const { orders, loading, updateOrderStatus } = useOrders();
  const [progress, setProgress] = useState<Record<string, number>>({});

  // Convert our new order statuses to LiveOrder statuses
  const { newOrders, preparingOrders, readyOrders, completedCountToday, totalOrdersToday, revenueToday } = useMemo(() => {
    const todayStr = new Date().toDateString();
    const newOrd = orders.filter((o) => o.status === "pending" || o.status === "confirmed");
    const prepOrd = orders.filter((o) => o.status === "preparing");
    const readyOrd = orders.filter((o) => o.status === "ready");
    
    const todayOrders = orders.filter((o) => new Date(o.createdAt).toDateString() === todayStr);
    const completedToday = todayOrders.filter((o) => o.status === "delivered" || o.status === "cancelled").length;
    const totalToday = todayOrders.length;
    const revToday = todayOrders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + parseFloat(o.totalAmount || "0"), 0);
    
    return {
      newOrders: newOrd,
      preparingOrders: prepOrd,
      readyOrders: readyOrd,
      completedCountToday: completedToday,
      totalOrdersToday: totalToday,
      revenueToday: revToday
    };
  }, [orders]);

  // Simulate progress bar for preparing orders
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = { ...prev };
        preparingOrders.forEach((order) => {
          if (!next[order.id]) {
            next[order.id] = Math.floor(Math.random() * 50);
          } else {
            next[order.id] = Math.min(next[order.id] + 1, 100);
          }
        });
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [preparingOrders]);

  const markAsPreparing = (id: string) => {
    // Generate a random token number
    const tokenNumber = Math.floor(Math.random() * 900) + 100;
    updateOrderStatus(id, "preparing", tokenNumber);
  };

  const markAsReady = (id: string, tokenNumber: number) => {
    updateOrderStatus(id, "ready", tokenNumber, "Counter 1");
  };

  const markHandoverComplete = (id: string) => {
    updateOrderStatus(id, "delivered");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg text-gray-500">Loading orders...</p>
      </div>
    );
  }

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
          { label: "Total Orders Today", value: totalOrdersToday.toString(), color: "bg-orange-50 text-orange-700" },
          { label: "Orders in Progress", value: preparingOrders.length.toString(), color: "bg-amber-50 text-amber-700" },
          { label: "Ready for Pickup", value: readyOrders.length.toString(), color: "bg-green-50 text-green-700" },
          { label: "Completed Orders", value: completedCountToday.toString(), color: "bg-blue-50 text-blue-700" },
          { label: "Revenue Today", value: "₹" + revenueToday.toFixed(0), color: "bg-emerald-50 text-emerald-700" },
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
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleTimeString()}</p>
                    <p className="text-xs font-bold text-orange-600">#{order.dailyOrderId || 'N/A'}</p>
                  </div>
                  <p className="font-semibold text-gray-900 mb-1">{order.user?.name || "Customer"}</p>
                  <p className="text-xs text-gray-500 mb-3">{order.user?.email || ""}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-orange-700">₹{parseFloat(order.totalAmount).toFixed(0)}</p>
                    <button 
                      onClick={() => markAsPreparing(order.id)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Start Preparing
                    </button>
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
                  <p className="text-xs text-gray-400 mb-2">{order.id} • {new Date(order.createdAt).toLocaleTimeString()}</p>
                  <p className="font-semibold text-gray-900 mb-1">{order.user?.name || "Customer"}</p>
                  {order.tokenNumber && (
                    <p className="text-orange-600 font-semibold mb-2">TKN-{order.tokenNumber}</p>
                  )}
                  <p className="text-xl font-bold text-gray-900 mb-4">₹{parseFloat(order.totalAmount).toFixed(0)}</p>
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                      <span>Prep Time: {order.prepTime || 10} mins</span>
                      <span>{progress[order.id] || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${progress[order.id] || 0}%` }}></div>
                    </div>
                  </div>
                  <button
                    onClick={() => order.tokenNumber && markAsReady(order.id, order.tokenNumber)}
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
                  <p className="text-xs text-gray-400 mb-2">{order.id} • {new Date(order.createdAt).toLocaleTimeString()}</p>
                  <p className="font-semibold text-gray-900 mb-1">{order.user?.name || "Customer"}</p>
                  {order.tokenNumber && (
                    <p className="text-orange-600 font-semibold mb-2">TKN-{order.tokenNumber}</p>
                  )}
                  <p className="text-sm text-gray-500 mb-4">Pickup at: {order.pickupDetails || "Counter 1"}</p>
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

        {/* Right Sidebar - Commented out raw data for now */}
        <div className="lg:col-span-1 space-y-6">
          {/* Top Selling Items - Commented out (use real data later) */}
          {/* <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
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
          </div> */}

          {/* Recent Notifications - Commented out (use real data later) */}
          {/* <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Recent Notifications</h3>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div key={notif.id} className="pb-3 border-b border-gray-100 last:border-0">
                  <p className="text-sm text-gray-800">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                </div>
              ))}
            </div>
          </div> */}

          {/* Low Stock Warnings - Commented out (use real data later) */}
          {/* <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Low Stock Warnings</h3>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between">
                  <p className="text-sm text-gray-800">{alert.item}</p>
                  <p className={`text-sm font-semibold ${alert.color}`}>{alert.level}</p>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
