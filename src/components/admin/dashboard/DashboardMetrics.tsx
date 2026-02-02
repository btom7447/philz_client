"use client";

import MetricCard from "./MetricCard";
import { useDashboardMetrics } from "@/app/admin/hooks/useDashboardMetrics";

const DashboardMetrics = () => {
  const { metrics, isLoading } = useDashboardMetrics();

  return (
    <div
      className="
        grid gap-4
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
      "
    >
      <MetricCard
        title="Total Properties"
        value={metrics.totalProperties}
        percentage={8}
        loading={isLoading}
      />

      <MetricCard
        title="Available Units"
        value={metrics.availableUnits}
        percentage={-3}
        loading={isLoading}
      />

      <MetricCard
        title="Upcoming Tours"
        value={metrics.upcomingTours}
        percentage={12}
        loading={isLoading}
      />

      <MetricCard
        title="New Requests"
        value={metrics.newRequests}
        percentage={5}
        loading={isLoading}
      />
    </div>
  );
};

export default DashboardMetrics;