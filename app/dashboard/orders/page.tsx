"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/nextjs";


type OrderStatus = "active" | "completed";
type CookStage =
  | "placed"
  | "confirmed"
  | "preparing"
  | "ready_for_pickup";

type Order = {
  id: string;
  title: string;
  status: OrderStatus;
  total: number;
  items: number;
  time: string;
  stage: CookStage;
  etaMinutes?: number;
  placedAt: string;
  restaurant: string;
  rating?: number;
};

type DbOrder = {
  id: string;
  totalAmount: string;
  status: string;
  createdAt: string;
  items: Array<{
    food: {
      name: string;
    };
  }>;
};


const Icon = {
  Search: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  Clock: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
};


const STAGES: { key: CookStage; label: string }[] = [
  { key: "placed", label: "Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "preparing", label: "Cooking" },
  { key: "ready_for_pickup", label: "Ready for pickup" },
];

function StageTimeline({ stage }: { stage: CookStage }) {
  const idx = STAGES.findIndex((s) => s.key === stage);

  return (
    <div className="mt-4 ">
      <div className="flex gap-2">
        {STAGES.map((s, i) => (
          <div key={s.key} className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className={`h-full transition-all ${
                i <= idx ? "bg-orange-500" : "bg-gray-200"
              }`}
            />
          </div>
        ))}
      </div>

      <div className="mt-2 flex justify-between text-xs text-gray-500">
        {STAGES.map((s, i) => (
          <span key={s.key} className={i <= idx ? "text-orange-500" : ""}>
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}


function useCountdown(min: number) {
  const [sec, setSec] = useState(min * 60);

  useEffect(() => {
    const t = setInterval(() => setSec((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(sec / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");

  return `${mm}:${ss}`;
}

function EtaPill({ minutes }: { minutes: number }) {
  const time = useCountdown(minutes);

  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-black px-3 py-1 text-xs text-yellow-200">
      <Icon.Clock className="h-3 w-3" />
      {time} ETA
    </div>
  );
}


export default function OrdersPage() {
  const { userId } = useAuth();
  const [tab, setTab] = useState<"all" | "active" | "past">("all");
  const [query, setQuery] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/orders?userId=${userId}`);
        if (res.ok) {
          const dbOrders: DbOrder[] = await res.json();

          // Convert DB orders to display format
          const displayOrders: Order[] = dbOrders.map((order) => {
            // Map database status to stage and status
            let stage: CookStage = "placed";
            let displayStatus: OrderStatus = "active";

            if (order.status === "pending" || order.status === "confirmed") {
              stage = "placed";
              displayStatus = "active";
            } else if (order.status === "preparing") {
              stage = "preparing";
              displayStatus = "active";
            } else if (order.status === "ready") {
              stage = "ready_for_pickup";
              displayStatus = "active";
            } else if (order.status === "delivered") {
              stage = "ready_for_pickup";
              displayStatus = "completed";
            } else if (order.status === "cancelled") {
              displayStatus = "completed";
            }

            return {
              id: order.id,
              title: order.items.map((item) => item.food?.name || "Unknown").join(", "),
              status: displayStatus,
              total: parseFloat(order.totalAmount),
              items: order.items.length,
              time: order.status,
              stage,
              placedAt: new Date(order.createdAt).toLocaleString(),
              restaurant: "Campus Canteen",
            };
          });

          setOrders(displayOrders);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (tab === "active") return o.status === "active";
      if (tab === "past") return o.status === "completed";

      return true;
    }).filter((o) =>
      o.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [tab, query, orders]);

  const active = filtered.filter((o) => o.status === "active");
  const past = filtered.filter((o) => o.status === "completed");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF6EE] p-6 flex items-center justify-center">
        <p className="text-lg text-gray-500">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF6EE] p-6 text-xl">
      <h1 className="text-3xl font-bold">Orders 🍔</h1>

      {/* search */}
      <div className="mt-4 flex gap-2">
        <input
          className="w-full rounded-full border px-4 py-2"
          placeholder="Search orders..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* tabs */}
      <div className="mt-4 flex gap-2">
        {["all", "active", "past"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`rounded-full px-4 py-1 ${
              tab === t ? "bg-orange-500 text-white" : "bg-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ACTIVE */}
      <div className="mt-6 space-y-4">
        {active.map((o) => (
          <div key={o.id} className="rounded-xl bg-white p-4">
            <h2 className="font-bold">{o.title}</h2>
            <p className="text-sm text-gray-500">{o.restaurant}</p>

            {o.etaMinutes && <EtaPill minutes={o.etaMinutes} />}

            <StageTimeline stage={o.stage} />

            <Link
              href={`/dashboard/orders/${o.id}`}
              className="mt-3 inline-block text-orange-600"
            >
              Track order →
            </Link>
          </div>
        ))}
      </div>

      {/* PAST */}
      <div className="mt-10 space-y-4">
        {past.map((o) => (
          <div key={o.id} className="rounded-xl bg-white p-4">
            <h2 className="font-bold">{o.title}</h2>
            <p className="text-sm text-gray-500">{o.restaurant}</p>
            <p>₹{o.total}</p>

            <Link
              href={`/dashboard/orders/${o.id}`}
              className="text-gray-500 text-sm"
            >
              View details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}