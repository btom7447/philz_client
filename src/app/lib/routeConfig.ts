import { UserRole } from "../types/auth";

export type RouteRule = {
  auth?: boolean;
  roles?: UserRole[];
};

export const routeConfig: Record<string, RouteRule> = {
  "/user": { auth: true, roles: ["user"] },
  "/admin": { auth: true, roles: ["admin"] },
  "/favorites": { auth: true },
  "/account": { auth: true },
  "/manage-properties": { auth: true, roles: ["admin"] },
};