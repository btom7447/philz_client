// app/admin/components/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminLinks } from "./adminLinks";
import { LogOut } from "lucide-react";
import { useAuthStore } from "app/store/useAuthStore";
import Image from "next/image";

export default function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const logout = useAuthStore((s) => s.logout);

const isActive = (href: string) => {
  // Dashboard should only be active on exact /admin
  if (href === "/admin") {
    return pathname === "/admin";
  }

  // Other routes: match subpaths
  return pathname === href || pathname.startsWith(href + "/");
};

  return (
    <aside className="pt-10 w-70 bg-gray-900 flex flex-col h-full">
      <div className="p-2 rounded-lg bg-white mx-auto mb-10">
        <Image
          src="/logo_one.png"
          alt="Philz Properties Logo"
          width={90}
          height={70}
          className="object-contain"
        />
      </div>

      <nav className="flex-1 px-2 space-y-1">
        {adminLinks.map((link) => {
          const active = isActive(link.href);
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-lg transition
                ${
                  active
                    ? "bg-purple-700 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }
              `}
            >
              <Icon className="w-6 h-6" strokeWidth={1.5} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={() => {
          logout();
          window.location.href = "/";
        }}
        className="flex items-center gap-3 px-4 py-3 text-xl border-t border-gray-800 text-red-400 hover:bg-gray-800"
      >
        <LogOut className="w-6 h-6 mr-3" />
        Logout
      </button>
    </aside>
  );
}