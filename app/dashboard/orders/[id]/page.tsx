"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

type Stage =
  | "placed"
  | "confirmed"
  | "preparing"
  | "ready_for_pickup";

const steps: { key: Stage; label: string }[] = [
  { key: "placed", label: "Order Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "preparing", label: "Preparing" },
  { key: "ready_for_pickup", label: "Ready for pickup" },
];

export default function OrderTrackingPage() {
  const params = useParams();
  const id = params.id as string;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await fetch(`/api/orders?orderId=${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setOrder(data[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch order tracking details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
    
    // Poll for status updates every 5 seconds
    const interval = setInterval(fetchOrderDetails, 5000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500 bg-[#FBF6EE]">
        Loading order status...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500 bg-[#FBF6EE]">
        Order not found
      </div>
    );
  }

  // Map db status to tracking steps progress index
  let progressIndex = 0;
  let statusText = "Placed";
  let eta = order.prepTime || 15;
  let stageText = "Your order is being processed";

  if (order.status === "pending") {
    progressIndex = 0;
    statusText = "Order Placed";
    stageText = "Waiting for canteen confirmation...";
  } else if (order.status === "confirmed") {
    progressIndex = 1;
    statusText = "Confirmed";
    stageText = "Canteen has accepted your order.";
  } else if (order.status === "preparing") {
    progressIndex = 2;
    statusText = "Preparing";
    stageText = "Your food is being prepared in the kitchen!";
  } else if (order.status === "ready") {
    progressIndex = 3;
    statusText = "Ready for pickup";
    eta = 0;
    stageText = `Your food is ready at ${order.pickupDetails || "Counter 1"}!`;
  } else if (order.status === "delivered") {
    progressIndex = 3;
    statusText = "Delivered";
    eta = 0;
    stageText = "Delivered! Hope you enjoy your delicious food.";
  } else if (order.status === "cancelled") {
    progressIndex = -1;
    statusText = "Cancelled";
    eta = 0;
    stageText = "This order was cancelled.";
  }

  const itemsTitle = order.items
    ?.map((item: any) => `${item.food?.name} x${item.quantity}`)
    .join(", ") || "Delicious Food Items";

  return (
    <div className="min-h-screen bg-[#FBF6EE] px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-6">

        {/* HEADER CARD */}
        <div className="rounded-3xl bg-white p-6 shadow-lg border">
          <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">
            Order #{order.dailyOrderId || id.slice(0, 8).toUpperCase()}
          </p>

          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            {itemsTitle}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            from <span className="font-semibold text-orange-600">Green Chilli Cafe</span>
          </p>

          {/* ETA CARD */}
          <div className="mt-4 flex items-center justify-between rounded-2xl bg-orange-50 p-4 border border-orange-100">
            <div>
              <p className="text-xs text-gray-500">Estimated Pickup Time</p>
              <p className="text-lg font-black text-orange-600">
                {order.status === "delivered" 
                  ? "Delivered" 
                  : order.status === "cancelled" 
                    ? "Cancelled" 
                    : `${eta} min`}
              </p>
            </div>

            <div className={`h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white ${order.status !== "delivered" && order.status !== "cancelled" ? "animate-pulse" : ""}`}>
              🍳
            </div>
          </div>
        </div>

        {/* STATUS */}
        <div className="rounded-3xl bg-white p-6 shadow-lg border">
          <h2 className="text-lg font-bold mb-4 text-gray-900">
            Status: <span className="text-orange-600">{statusText}</span>
          </h2>

          {/* PROGRESS LINE */}
          <div className="relative pl-6 border-l-2 border-gray-200 space-y-6 ml-2">
            {steps.map((s, i) => {
              const active = i <= progressIndex && progressIndex !== -1;
              const current = i === progressIndex;

              return (
                <div key={s.key} className="relative flex items-center gap-4">
                  {/* Dot */}
                  <div
                    className={`absolute -left-[31px] z-10 h-4 w-4 rounded-full border-2 transition-all ${
                      active
                        ? current
                          ? "bg-orange-500 border-orange-500 scale-125 ring-4 ring-orange-100"
                          : "bg-orange-500 border-orange-500"
                        : "bg-white border-gray-300"
                    }`}
                  />

                  <div>
                    <p
                      className={`text-sm font-semibold transition-colors ${
                        active ? "text-orange-600" : "text-gray-400"
                      }`}
                    >
                      {s.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* LIVE TRACK CARD */}
        {order.status !== "cancelled" && (
          <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white shadow-lg">
            <p className="text-sm opacity-80 uppercase font-bold tracking-wider">Live Details</p>
            <h3 className="text-xl font-extrabold mt-1">
              {stageText}
            </h3>

            <div className="mt-4 flex items-center justify-between">
              {order.tokenNumber && (
                <div>
                  <p className="text-xs opacity-80">Your Token Number:</p>
                  <p className="font-black text-2xl text-yellow-200 mt-0.5">#{order.tokenNumber}</p>
                </div>
              )}
              {order.pickupDetails && (
                <div>
                  <p className="text-xs opacity-80">Pickup Counter:</p>
                  <p className="font-black text-lg text-yellow-200 mt-0.5">{order.pickupDetails}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex gap-3">
          <Link href="/dashboard/orders" className="flex-1 text-center py-3.5 rounded-2xl bg-white border border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            Back to Orders List
          </Link>
          <a href="tel:+91XXXXXXXXXX" className="flex-1 text-center py-3.5 rounded-2xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors shadow-md">
            Call Support
          </a>
        </div>

      </div>
    </div>
  );
}