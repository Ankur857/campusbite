"use client";

import { useOrders } from "@/contexts/OrdersContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueChart() {
  const { orders, loading } = useOrders();

  if (loading) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm h-[400px] flex items-center justify-center text-gray-500 dark:text-zinc-400 font-semibold animate-pulse border border-gray-150/40 dark:border-zinc-800">
        Loading revenue data...
      </div>
    );
  }

  // Calculate revenue for the last 7 days
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const revenueData = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayLabel = daysOfWeek[d.getDay()];
    
    // Filter non-cancelled orders on this specific date
    const dayOrders = orders.filter(o => {
      const orderDate = new Date(o.createdAt);
      return (
        o.status !== "cancelled" &&
        orderDate.getFullYear() === d.getFullYear() &&
        orderDate.getMonth() === d.getMonth() &&
        orderDate.getDate() === d.getDate()
      );
    });

    const dayRevenue = dayOrders.reduce((sum, o) => sum + parseFloat(o.totalAmount || "0"), 0);

    revenueData.push({
      day: dayLabel,
      revenue: Math.round(dayRevenue),
    });
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm h-[400px] border border-gray-100 dark:border-zinc-800/85 hover:shadow-md transition-shadow duration-300">
      <h2 className="font-bold text-lg mb-4 text-gray-800 dark:text-white transition-colors duration-300">
        Revenue Overview (Last 7 Days)
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={revenueData}>
          <XAxis dataKey="day" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "var(--card, #fff)", 
              color: "var(--card-foreground, #000)", 
              borderRadius: "12px", 
              border: "1px solid var(--border, #e2e8f0)" 
            }}
            itemStyle={{ color: "var(--card-foreground, #000)" }}
            labelStyle={{ color: "var(--muted-foreground, #64748b)" }}
            formatter={(value) => [`₹${value}`, "Revenue"]}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#ea580c"
            strokeWidth={3}
            dot={{ r: 4, stroke: "#ea580c", strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}