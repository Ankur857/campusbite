"use client";

import { useOrders } from "@/contexts/OrdersContext";

export default function TrafficHeatmap() {
  const { orders, loading } = useOrders();

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm h-[320px] flex items-center justify-center text-gray-500 font-semibold animate-pulse border">
        Loading traffic heatmap...
      </div>
    );
  }

  // Initialize matrix with zeros
  const matrix = Array(5).fill(0).map(() => Array(11).fill(0));

  // Count orders in each time slot
  orders.forEach(order => {
    const d = new Date(order.createdAt);
    const dayIndex = d.getDay() - 1; // 0 = Mon, ..., 4 = Fri
    const hour = d.getHours();
    const hourIndex = hours.indexOf(hour);

    if (dayIndex >= 0 && dayIndex < 5 && hourIndex >= 0 && hourIndex < 11) {
      matrix[dayIndex][hourIndex] += 1;
    }
  });

  // To map counts to colors, find the max count in the matrix
  let maxCount = 0;
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 11; c++) {
      if (matrix[r][c] > maxCount) maxCount = matrix[r][c];
    }
  }

  // Map each value to a tier (1 to 5)
  const data = matrix.map(row => 
    row.map(count => {
      if (count === 0) return 0;
      if (maxCount === 0) return 1;
      const fraction = count / maxCount;
      if (fraction <= 0.2) return 1;
      if (fraction <= 0.4) return 2;
      if (fraction <= 0.6) return 3;
      if (fraction <= 0.8) return 4;
      return 5;
    })
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <h2 className="font-semibold text-lg mb-6 text-gray-800">
        Traffic Heatmap (Peak Hours)
      </h2>

      <div className="overflow-x-auto">
        <div className="grid gap-2 min-w-[600px]">
          <div className="grid grid-cols-12 gap-2">
            <div />
            {hours.map((hour) => (
              <div
                key={hour}
                className="text-xs text-center font-medium text-gray-500"
              >
                {hour.toString().padStart(2, '0')}:00
              </div>
            ))}
          </div>

          {days.map((day, rowIndex) => (
            <div
              key={day}
              className="grid grid-cols-12 gap-2 items-center"
            >
              <div className="text-sm font-semibold text-gray-600 w-10">
                {day}
              </div>

              {data[rowIndex].map((value, colIndex) => {
                const count = matrix[rowIndex][colIndex];
                return (
                  <div
                    key={colIndex}
                    title={`${count} orders placed in this hour`}
                    className={`h-8 rounded transition-all duration-300 ${
                      value === 0
                        ? "bg-slate-50 border border-slate-100"
                        : value === 1
                        ? "bg-orange-100"
                        : value === 2
                        ? "bg-orange-200"
                        : value === 3
                        ? "bg-orange-300"
                        : value === 4
                        ? "bg-orange-500"
                        : "bg-orange-700"
                    }`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-slate-50 border rounded" /> 0 orders</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-orange-100 rounded" /> Light</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-orange-300 rounded" /> Moderate</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-orange-700 rounded" /> Busy</div>
      </div>
    </div>
  );
}