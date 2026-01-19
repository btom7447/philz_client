import { requireRole } from "../lib/guards";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminDashboardPage() {
  // Server-side role check
  await requireRole(["admin"], "/admin");

  // Pass props if needed
  return <AdminDashboard />;
}
