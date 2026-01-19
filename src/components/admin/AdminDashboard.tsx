"use client";

import { useAuthStore } from "app/store/useAuthStore";

export default function AdminDashboard() {
  const user = useAuthStore((state) => state.user);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="text-lg font-semibold">
      Welcome, {user.name} (Admin Dashboard)
    </div>
  );
}