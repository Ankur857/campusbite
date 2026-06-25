"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Stage =
  | "placed"
  | "confirmed"
  | "preparing"
  | "ready_for_pickup";

const orderDB = {
  ORD101: {
    title: "Pizza + Noodles",
    restaurant: "Tossed & Sauced",
    status: "Preparing your food...",
    eta: 18,
    stage: "preparing" as Stage,
  },
  ORD102: {
    title: "Burger Combo",
    restaurant: "Patty People",
    status: "Delivered",
    eta: 0,
    stage: "delivered" as Stage,
  },
};

const steps: { key: Stage; label: string }[] = [
  { key: "placed", label: "Order Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "preparing", label: "Preparing" },
  { key: "ready_for_pickup", label: "Ready for pickup" },
];

export default function OrderTrackingPage() {
  const params = useParams();
  const id = params.id as string;

  const order = orderDB[id as keyof typeof orderDB];

  const [progress, setProgress] = useState(2); // fake live progress

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => (p < 4 ? p + 1 : p));
    }, 3000);

    return () => clearInterval(t);
  }, []);

  if (!order) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Order not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF6EE] px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-6">

        {/* HEADER CARD */}
        <div className="rounded-3xl bg-white p-6 shadow-lg border">
          <p className="text-sm text-gray-500">Order ID #{id}</p>

          <h1 className="mt-1 text-2xl font-bold">
            {order.title}
          </h1>

          <p className="text-sm text-gray-500">
            from <span className="font-medium text-black">{order.restaurant}</span>
          </p>

          {/* ETA CARD */}
          <div className="mt-4 flex items-center justify-between rounded-2xl bg-orange-50 p-4">
            <div>
              <p className="text-xs text-gray-500">Estimated Time</p>
              <p className="text-lg font-bold text-orange-600">
                {order.eta > 0 ? `${order.eta} min` : "Delivered"}
              </p>
            </div>

            <div className="h-10 w-10 animate-pulse rounded-full bg-orange-500" />
          </div>
        </div>

        {/* STATUS */}
        <div className="rounded-3xl bg-white p-6 shadow-lg border">
          <h2 className="text-lg font-bold mb-4">
            Status: {order.status}
          </h2>

          {/* PROGRESS LINE */}
          <div className="relative">
            <div className="absolute left-2 top-0 h-full w-[2px] bg-gray-200" />

            {steps.map((s, i) => {
              const active = i <= progress;

              return (
                <div key={s.key} className="relative mb-6 flex items-center gap-4">
                  <div
                    className={`z-10 h-4 w-4 rounded-full border-2 ${
                      active
                        ? "bg-orange-500 border-orange-500"
                        : "bg-white border-gray-300"
                    }`}
                  />

                  <div>
                    <p
                      className={`text-sm font-medium ${
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
        <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white shadow-lg">
          <p className="text-sm opacity-80">Live Tracking</p>
          <h3 className="text-xl font-bold mt-1">
            Your food is on the way 
          </h3>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-xs opacity-80">Code:</p>
              <p className="font-semibold">INV78ME33</p>
            </div>

          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">
          <button className="flex-1 rounded-2xl border bg-white py-3 font-medium hover:: bg-gradient-to-l from-orange-300 to-orange-100">
            Call Support
          </button>

          
        </div>

      </div>
    </div>
  );
}