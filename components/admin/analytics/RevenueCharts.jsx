"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", revenue: 1200 },
  { day: "Tue", revenue: 1800 },
  { day: "Wed", revenue: 2200 },
  { day: "Thu", revenue: 1700 },
  { day: "Fri", revenue: 2800 },
  { day: "Sat", revenue: 3200 },
  { day: "Sun", revenue: 2600 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm h-[400px]">
      <h2 className="font-semibold text-lg mb-4">
        Revenue Overview
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#ea580c"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}