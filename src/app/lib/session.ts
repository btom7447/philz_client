import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getSession() {
  const allCookies = await cookies();
  const token = allCookies.get("token")?.value;

  if (!token) return null;

  return await verifyToken(token);
}
