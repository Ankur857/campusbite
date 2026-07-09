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
          <div key={s.key} className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className={`h-full transition-all ${i <= idx ? "bg-orange-500" : "bg-gray-200 dark:bg-zinc-800"
                }`}
            />
          </div>
        ))}
      </div>

      <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-zinc-450">
        {STAGES.map((s, i) => (
          <span key={s.key} className={i <= idx ? "text-orange-500 dark:text-orange-400 font-semibold" : ""}>
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
    <div className="inline-flex items-center gap-1 rounded-full bg-black dark:bg-zinc-900 px-3 py-1 text-xs text-yellow-200 border dark:border-zinc-800">
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
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-6 flex items-center justify-center text-gray-500">
        <p className="text-lg animate-pulse font-semibold">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-6 text-xl text-foreground transition-colors duration-300">
      <h1 className="text-3xl font-black text-gray-950 dark:text-white tracking-tight">Orders 🍔</h1>

      {/* search */}
      <div className="mt-4 flex gap-2">
        <input
          className="w-full rounded-full border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
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
            className={`rounded-full px-4 py-1.5 text-xs font-bold border transition-colors cursor-pointer ${tab === t 
              ? "bg-orange-500 border-orange-500 text-white" 
              : "bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800"
              }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ACTIVE */}
      <div className="mt-6 space-y-4">
        {active.map((o) => (
          <div key={o.id} className="rounded-2xl bg-white dark:bg-zinc-900 p-5 border border-gray-150/40 dark:border-zinc-850 shadow-sm">
            <h2 className="font-extrabold text-gray-950 dark:text-white text-lg">{o.title}</h2>
            <p className="text-xs text-gray-400 dark:text-zinc-500 font-medium mt-0.5">{o.restaurant}</p>

            {o.etaMinutes && <EtaPill minutes={o.etaMinutes} />}

            <StageTimeline stage={o.stage} />

            <Link
              href={`/dashboard/orders/${o.id}`}
              className="mt-3 inline-block text-orange-600 dark:text-orange-400 text-sm font-bold hover:underline"
            >
              Track order →
            </Link>
          </div>
        ))}
      </div>

      {/* PAST */}
      <div className="mt-10 space-y-4">
        <h3 className="text-sm font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Past Orders</h3>
        {past.map((o) => (
          <div key={o.id} className="rounded-2xl bg-white dark:bg-zinc-900 p-5 border border-gray-150/40 dark:border-zinc-855 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-extrabold text-gray-950 dark:text-white text-lg">{o.title}</h2>
                <p className="text-xs text-gray-400 dark:text-zinc-500 font-medium mt-0.5">{o.restaurant}</p>
              </div>
              <p className="font-black text-gray-900 dark:text-white">₹{o.total}</p>
            </div>

            <Link
              href={`/dashboard/orders/${o.id}`}
              className="text-orange-600 dark:text-orange-400 text-sm font-bold hover:underline inline-block mt-1"
            >
              View details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}