import { getSession } from "./session";
import { redirect } from "next/navigation";

type Role = "admin" | "user";

export async function requireRole(allowedRoles: Role[], currentPath: string) {
  const user = await getSession();

  if (!user || !allowedRoles.includes(user.role as Role)) {
    const url = new URL(
      "/login",
      process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000",
    );
    url.searchParams.set("next", currentPath);
    redirect(url.toString());
  }

  return user;
}