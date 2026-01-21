"use client";

import { ReactNode, useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/main/AdminSidebar";
import AdminHeader from "@/components/admin/main/AdminHeader";
import { Toaster } from "sonner";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter, usePathname } from "next/navigation";

interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "admin" | "user";
  avatarUrl?: string;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" }); // sends cookies
        if (!res.ok) throw new Error("Not authorized");

        const data = await res.json();
        setUser(data.user);
        setLoading(false);
      } catch (err) {
        router.push(`/login?next=${pathname}`);
      }
    };

    fetchUser();
  }, [router, pathname]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader size={50} color="#7c3aed" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-purple-50 relative">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar user={user} />
      </div>

      {/* Mobile sidebar overlay + slide-in */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <div className="absolute inset-0 backdrop-blur-xs bg-white/30" />
        <div
          className={`absolute top-0 left-0 h-full w-64 bg-gray-900 transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <AdminSidebar user={user} onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-scroll">
        <AdminHeader user={user} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-5">{children}</main>
      </div>

      <Toaster position="top-right" richColors />
    </div>
  );
}
