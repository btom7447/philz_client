import { AuthUser } from "../types/auth";

export function isAdmin(user: AuthUser | null) {
  return user?.role === "admin";
}

export function isUser(user: AuthUser | null) {
  return user?.role === "user";
}

export function hasRole(user: AuthUser | null, roles?: ("user" | "admin")[]) {
  if (!roles || roles.length === 0) return true;
  return !!user && roles.includes(user.role);
}