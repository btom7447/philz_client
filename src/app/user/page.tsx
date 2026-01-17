import { requireRole } from "../lib/guards";

export default async function UserDashboard() {
  const user = await requireRole(["user"], "/user");

  return <div>Welcome, {user.email} (User Dashboard)</div>;
}