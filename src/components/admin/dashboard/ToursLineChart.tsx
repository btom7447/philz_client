"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTours } from "@/app/admin/hooks/useAdminData";
import { groupByMonth } from "@/app/utils/groupByMonth";

const ToursBarChart = () => {
  const { data, isLoading } = useTours();

  const chartData = useMemo(() => {
    if (!data?.data) return [];
    return groupByMonth(data.data.map((t) => t.tourTime));
  }, [data]);

  if (isLoading) {
    return (
      <div className="rounded-xl shadow-sm p-5 bg-white animate-pulse">
        {/* Title */}
        <div className="h-5 w-40 bg-gray-200 rounded mb-6" />

        {/* Chart area */}
        <div className="h-65 flex items-end gap-4 px-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              {/* Bar */}
              <div
                className="w-full bg-gray-200 rounded-t"
                style={{
                  height: `${40 + i * 20}px`,
                }}
              />

              {/* X-axis label */}
              <div className="h-3 w-8 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl shadow-sm p-5 bg-white">
      <h3 className="mb-4 font-semibold">Tours Overview</h3>
      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#E4D8FE" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ToursBarChart;