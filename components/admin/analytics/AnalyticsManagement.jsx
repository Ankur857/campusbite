"use client";
import RevenueChart from '../analytics/RevenueCharts';
import TopItems from '../analytics/TopItems';
import TrafficHeatmap from '../analytics/HeatMap';

export default function AnalyticsPage() {
  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Analytics Dashboard
        </h1>
        <p className="text-slate-500">
          Real-time performance metrics
        </p>
      </div>

      {/* Revenue + Top Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        <div>
          <TopItems />
        </div>
      </div>

      {/* Heatmap */}
      <TrafficHeatmap />
    </div>
  );
}