"use client";

import { FC } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Props {
  title: string;
  value?: number;
  percentage?: number; // positive or negative
  loading?: boolean;
}

const MetricCard: FC<Props> = ({ title, value, percentage, loading }) => {
  const isPositive = (percentage ?? 0) >= 0;

  if (loading) {
    return (
      <div className="rounded-2xl bg-white px-5 py-10 shadow-sm animate-pulse">
        <div className="h-4 w-32 bg-gray-200 rounded mb-4" />
        <div className="flex items-center gap-3">
          <div className="h-8 w-20 bg-gray-200 rounded" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-10 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white px-5 py-10 shadow-sm transition">
      {/* Title */}
      <p className="text-lg text-gray-500 mb-2">{title}</p>

      {/* Value + trend */}
      <div className="flex items-center gap-3">
        <h3 className="text-3xl font-semibold text-gray-900">
          {value?.toLocaleString() ?? 0}
        </h3>

        {percentage !== undefined && (
          <div
            className={`flex items-center text-md font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight size={16} />
            ) : (
              <ArrowDownRight size={16} />
            )}
            {Math.abs(percentage)}%
            <span className="ml-1 text-gray-400 font-normal">this month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;