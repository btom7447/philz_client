"use client";

import DashboardCharts from "../dashboard/DashboardCharts";
import DashboardMetrics from "../dashboard/DashboardMetrics";
import DashboardProperties from "../dashboard/DashboardProperties";


export default function AdminDashboard() {

  return (
    <div className="space-y-5">
      <DashboardMetrics />
      <DashboardCharts />
      <DashboardProperties />
    </div>
  );
}