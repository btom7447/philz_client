import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { AuthUser } from "../types/auth";

export async function getServerSession(): Promise<AuthUser | null> {
  const allCookies = await cookies();
  const token = allCookies.get("token")?.value;

  if (!token) return null;

  return await verifyToken(token);
}
