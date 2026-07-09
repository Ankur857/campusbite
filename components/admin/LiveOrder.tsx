"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useOrders } from "@/contexts/OrdersContext";
import { Clock, CheckCircle2, Flame, User, ShoppingBag, ArrowRight } from "lucide-react";

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-lg text-gray-500 font-semibold mb-2 animate-pulse">Loading Live Order Manager...</p>
          <p className="text-sm text-gray-400">Syncing database changes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-8 overflow-auto bg-gray-50 dark:bg-zinc-950 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="text-3xl font-black text-gray-950 dark:text-white tracking-tight flex items-center gap-2">
              <span>Live Order Dashboard</span>
              <span className="text-2xl">⚡</span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1 font-medium">Manage and process active student order stages in real time.</p>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 px-5 py-3 rounded-2xl border border-gray-150 dark:border-zinc-800 shadow-sm w-fit">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
            <span className="font-extrabold text-sm text-gray-800 dark:text-zinc-200 uppercase tracking-wider">Kitchen Terminal Live</span>
          </div>
        </div>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {[
          { label: "Today's Orders", value: totalOrdersToday.toString(), icon: "📦", color: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900/30" },
          { label: "In Kitchen", value: preparingOrders.length.toString(), icon: "🍳", color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30" },
          { label: "Ready to Pick", value: readyOrders.length.toString(), icon: "🔔", color: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900/30" },
          { label: "Completed Orders", value: completedCountToday.toString(), icon: "✅", color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30" },
          { label: "Live Revenue", value: "₹" + revenueToday.toFixed(0), icon: "💰", color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30" },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-gray-150/50 dark:border-zinc-800/80 flex items-center gap-4 hover:shadow-md transition">
            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-bold text-xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 items-start">
        
        {/* Column 1: New Orders */}
        <div className="flex flex-col bg-gray-100/40 dark:bg-zinc-900/20 border border-gray-200/50 dark:border-zinc-800/60 p-4 rounded-3xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200/60 dark:border-zinc-800/60">
            <span className="px-3 py-1 bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400 rounded-full text-xs font-bold border border-orange-100 dark:border-orange-900/30">
              NEW ORDERS
            </span>
            <span className="text-sm font-bold text-gray-400 dark:text-zinc-500 bg-white dark:bg-zinc-900 px-2 py-0.5 rounded-md border border-gray-250/20 dark:border-zinc-800">{newOrders.length}</span>
          </div>

          <div className="space-y-4 max-h-[650px] overflow-y-auto pr-1">
            {newOrders.map((order) => {
              const customerInitials = (order.user?.name || "G").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
              return (
                <div key={order.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-sm border border-gray-150/40 dark:border-zinc-800/80 hover:shadow-md transition duration-300 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-50 dark:border-zinc-800/50">
                    <p className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                      <Clock size={12} /> {new Date(order.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <span className="text-xs bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400 px-2 py-0.5 rounded font-bold border border-orange-100/30">
                      {order.dailyOrderId ? `#${order.dailyOrderId}` : `#${order.id.slice(0, 4).toUpperCase()}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/30 text-orange-700 dark:text-orange-400 flex items-center justify-center font-bold text-sm">
                      {customerInitials}
                    </div>
                    <div>
                      <p className="font-extrabold text-gray-900 dark:text-white text-sm leading-none">{order.user?.name || "Customer"}</p>
                      <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1 font-medium truncate max-w-[150px]">{order.user?.email || "No Email"}</p>
                    </div>
                  </div>

                  {/* Order items listing */}
                  <div className="bg-gray-50 dark:bg-zinc-950/60 rounded-xl p-3 border border-gray-100 dark:border-zinc-800/80 space-y-1.5">
                    <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-550 uppercase tracking-wider flex items-center gap-1">
                      <ShoppingBag size={10} /> Items Ordered
                    </p>
                    <div className="space-y-1">
                      {order.items?.map((item, idx) => (
                        <p key={idx} className="text-xs text-gray-700 dark:text-zinc-300 font-semibold flex justify-between">
                          <span>{item.food?.name || "Food Item"}</span>
                          <span className="text-orange-600 dark:text-orange-450">×{item.quantity}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <p className="text-[10px] text-gray-400 dark:text-zinc-500">Total Price</p>
                      <p className="text-lg font-black text-gray-900 dark:text-zinc-100">₹{parseFloat(order.totalAmount).toFixed(0)}</p>
                    </div>
                    <button 
                      onClick={() => markAsPreparing(order.id)}
                      className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-95 rounded-xl shadow-sm transition hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      Start Preparing
                    </button>
                  </div>
                </div>
              );
            })}
            {newOrders.length === 0 && (
              <div className="text-center py-12 text-gray-450 text-xs">No pending orders.</div>
            )}
          </div>
        </div>

        {/* Column 2: Preparing */}
        <div className="flex flex-col bg-gray-100/40 dark:bg-zinc-900/20 border border-gray-200/50 dark:border-zinc-800/60 p-4 rounded-3xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200/60 dark:border-zinc-800/60">
            <span className="px-3 py-1 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 rounded-full text-xs font-bold border border-amber-100 dark:border-amber-900/30">
              PREPARING
            </span>
            <span className="text-sm font-bold text-gray-400 dark:text-zinc-500 bg-white dark:bg-zinc-900 px-2 py-0.5 rounded-md border border-gray-250/20 dark:border-zinc-800">{preparingOrders.length}</span>
          </div>

          <div className="space-y-4 max-h-[650px] overflow-y-auto pr-1">
            {preparingOrders.map((order) => {
              const customerInitials = (order.user?.name || "G").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
              const progressVal = progress[order.id] || 0;
              return (
                <div key={order.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-sm border border-gray-150/40 dark:border-zinc-800/80 hover:shadow-md transition duration-300 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-50 dark:border-zinc-800/50">
                    <p className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                      <Clock size={12} /> {new Date(order.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {order.tokenNumber && (
                      <span className="text-xs bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded font-bold border border-amber-100/30 dark:border-amber-900/30 flex items-center gap-1">
                        <Flame size={12} className="text-amber-500 animate-pulse" /> TKN-{order.tokenNumber}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
                      {customerInitials}
                    </div>
                    <div>
                      <p className="font-extrabold text-gray-900 dark:text-white text-sm leading-none">{order.user?.name || "Customer"}</p>
                      <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1 font-medium truncate max-w-[150px]">{order.user?.email || "No Email"}</p>
                    </div>
                  </div>

                  {/* Order items listing */}
                  <div className="bg-gray-50 dark:bg-zinc-950/60 rounded-xl p-3 border border-gray-100 dark:border-zinc-800/80 space-y-1.5">
                    <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-550 uppercase tracking-wider flex items-center gap-1">
                      <ShoppingBag size={10} /> Items Ordered
                    </p>
                    <div className="space-y-1">
                      {order.items?.map((item, idx) => (
                        <p key={idx} className="text-xs text-gray-700 dark:text-zinc-300 font-semibold flex justify-between">
                          <span>{item.food?.name || "Food Item"}</span>
                          <span className="text-amber-600 dark:text-amber-450">×{item.quantity}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Progress Indicators */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-505 dark:text-zinc-400 font-semibold">
                      <span>Prep time: ~{order.prepTime || 10} mins</span>
                      <span className="text-amber-600 dark:text-amber-450">{progressVal}%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-zinc-850 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-orange-500 h-1.5 rounded-full transition-all duration-1000" 
                        style={{ width: `${progressVal}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => order.tokenNumber && markAsReady(order.id, order.tokenNumber)}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-95 text-white py-2.5 rounded-xl font-bold text-xs shadow-sm transition hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Mark as Ready
                  </button>
                </div>
              );
            })}
            {preparingOrders.length === 0 && (
              <div className="text-center py-12 text-gray-450 text-xs">No active orders cooking.</div>
            )}
          </div>
        </div>

        {/* Column 3: Ready for Pickup */}
        <div className="flex flex-col bg-gray-100/40 dark:bg-zinc-900/20 border border-gray-200/50 dark:border-zinc-800/60 p-4 rounded-3xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200/60 dark:border-zinc-800/60">
            <span className="px-3 py-1 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 rounded-full text-xs font-bold border border-green-100 dark:border-green-900/30">
              READY TO PICK
            </span>
            <span className="text-sm font-bold text-gray-400 dark:text-zinc-500 bg-white dark:bg-zinc-900 px-2 py-0.5 rounded-md border border-gray-250/20 dark:border-zinc-800">{readyOrders.length}</span>
          </div>

          <div className="space-y-4 max-h-[650px] overflow-y-auto pr-1">
            {readyOrders.map((order) => {
              const customerInitials = (order.user?.name || "G").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
              return (
                <div key={order.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-sm border border-gray-150/40 dark:border-zinc-800/80 hover:shadow-md transition duration-300 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-50 dark:border-zinc-800/50">
                    <p className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                      <Clock size={12} /> {new Date(order.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {order.tokenNumber && (
                      <span className="text-xs bg-green-55 dark:bg-green-950/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded font-bold border border-green-200/30 dark:border-green-800/30 flex items-center gap-1">
                        <CheckCircle2 size={12} className="text-green-55 dark:text-green-400" /> TKN-{order.tokenNumber}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center font-bold text-sm">
                      {customerInitials}
                    </div>
                    <div>
                      <p className="font-extrabold text-gray-900 dark:text-white text-sm leading-none">{order.user?.name || "Customer"}</p>
                      <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1 font-medium truncate max-w-[150px]">{order.user?.email || "No Email"}</p>
                    </div>
                  </div>

                  {/* Order items listing */}
                  <div className="bg-gray-50 dark:bg-zinc-950/60 rounded-xl p-3 border border-gray-100 dark:border-zinc-800/80 space-y-1.5">
                    <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-555 uppercase tracking-wider flex items-center gap-1">
                      <ShoppingBag size={10} /> Items Ordered
                    </p>
                    <div className="space-y-1">
                      {order.items?.map((item, idx) => (
                        <p key={idx} className="text-xs text-gray-700 dark:text-zinc-300 font-semibold flex justify-between">
                          <span>{item.food?.name || "Food Item"}</span>
                          <span className="text-green-600 dark:text-green-450">×{item.quantity}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium bg-gray-100 dark:bg-zinc-950/60 px-2.5 py-1.5 rounded-lg border border-gray-150/40 dark:border-zinc-800">
                    📍 Location: <span className="font-bold text-gray-700 dark:text-zinc-300">{order.pickupDetails || "Counter 1"}</span>
                  </p>

                  <button
                    onClick={() => markHandoverComplete(order.id)}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-95 text-white py-2.5 rounded-xl font-bold text-xs shadow-sm transition hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Handover Complete
                  </button>
                </div>
              );
            })}
            {readyOrders.length === 0 && (
              <div className="text-center py-12 text-gray-455 text-xs">No orders waiting for handover.</div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
