"use client";

import { Menu, Bell, Map, Calendar } from "lucide-react";
import { usePathname } from "next/navigation";
import { adminLinks } from "./adminLinks";

export function getAdminTitle(
  pathname: string,
  links: typeof adminLinks,
): string {
  for (const link of links) {
    // direct link (e.g. /admin, /admin/users)
    if ("href" in link && link.href === pathname) {
      return link.name;
    }

    // children links (e.g. /admin/properties, /admin/properties/new)
    if ("children" in link) {
      const child = link.children.find((c) => c.href === pathname);
      if (child) return child.name;

      // handle dynamic [id] routes for properties
      if (
        link.name === "Properties" &&
        pathname.startsWith("/admin/properties/")
      ) {
        const knownPaths = link.children.map((c) => c.href);
        if (!knownPaths.includes(pathname)) {
          return "Edit Property";
        }
      }
    }
  }

  return "Dashboard";
}

export default function AdminHeader({
  user,
  onMenuClick,
}: {
  user: { name: string; role: string };
  onMenuClick: () => void;
}) {
  const pathname = usePathname();

  const title = getAdminTitle(pathname, adminLinks);
  return (
    <header className="bg-white border-b border-gray-300 flex items-center justify-between px-5 py-5">
      <h1 className="text-2xl font-semibold capitalize">{title}</h1>
      <div className="flex items-center gap-5">
        {/* Tours */}
        <div className="relative">
          <Calendar
            className="w-7 h-7 text-gray-600 cursor-pointer"
            strokeWidth={1}
          />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-600 rounded-full" />
        </div>

        {/* Notifications */}
        <div className="relative mr-8">
          <Bell
            className="w-7 h-7 text-gray-600 cursor-pointer"
            strokeWidth={1}
          />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-600 rounded-full" />
        </div>

        {/* Profile */}
        {user && (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
              {user.name.charAt(0)}
            </div>
            <div className="hidden md:block leading-tight">
              <p className="text-lg font-medium">{user.name}</p>
              <p className="text-lg text-gray-500 capitalize">{user.role}</p>
            </div>

            {/* Mobile sidebar toggle */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded hover:bg-gray-100"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}