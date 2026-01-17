import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt";
import { routeConfig } from "./lib/routeConfig";
import { hasRole } from "./lib/roles";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("token")?.value;
  const user = token ? await verifyToken(token) : null;

  // find matching rule (supports nested routes)
  const matchedRule = Object.entries(routeConfig).find(
    ([route]) => pathname === route || pathname.startsWith(`${route}/`),
  )?.[1];

  if (!matchedRule) {
    // no rule = public page
    return NextResponse.next();
  }

  // auth required but no user
  if (matchedRule.auth && !user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // role restricted
  if (!hasRole(user, matchedRule.roles)) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};