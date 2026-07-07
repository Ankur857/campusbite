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
      <div className="bg-white rounded-2xl p-6 shadow-sm h-[400px] flex items-center justify-center text-gray-500 font-semibold animate-pulse border">
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
    <div className="bg-white rounded-2xl p-6 shadow-sm h-[400px] border border-gray-100 hover:shadow-md transition-shadow">
      <h2 className="font-semibold text-lg mb-4 text-gray-800">
        Revenue Overview (Last 7 Days)
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={revenueData}>
          <XAxis dataKey="day" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip 
            contentStyle={{ backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0" }}
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