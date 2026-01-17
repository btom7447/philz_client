import { requireRole } from "../lib/guards";

export default async function AdminDashboard() {
  const user = await requireRole(["admin"], "/admin");

  return <div>Welcome, {user.email} (Admin Dashboard)</div>;
}