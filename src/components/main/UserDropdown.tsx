"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "@/app/store/useAuthStore";
import {
  LogIn,
  User as UserIcon,
  UserPlus,
  Settings,
  BookOpen,
  LayoutDashboard,
  LogOut,
  Building2,
  HouseHeart,
  Binoculars,
} from "lucide-react";

interface UserDropdownProps {
  user: User | null;
  onLogout?: () => void;
  isMobile?: boolean;
}

export default function UserDropdown({
  user,
  onLogout,
  isMobile,
}: UserDropdownProps) {
  const pathname = usePathname();
  const spacing = isMobile ? "gap-2" : "space-y-2";

  // Helper to determine if the link is active (current or child path)
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  if (!user) {
    // Not authenticated
    return (
      <div className={`flex flex-col justify-between flex-1 ${spacing}`}>
        <div className={spacing}>
          <Link
            href="/login"
            className={`flex items-center p-2 rounded-lg text-lg ${
              isActive("/login")
                ? "bg-purple-100 text-purple-700 font-semibold"
                : "text-gray-700 hover:text-purple-700 hover:bg-purple-100"
            }`}
          >
            <LogIn className="w-6 h-6 mr-2" strokeWidth={1} />
            Login
          </Link>
          <Link
            href="/signup"
            className={`flex items-center p-2 rounded-lg text-lg ${
              isActive("/signup")
                ? "bg-purple-100 text-purple-700 font-semibold"
                : "text-gray-700 hover:text-purple-700 hover:bg-purple-100"
            }`}
          >
            <UserPlus className="w-6 h-6 mr-2" strokeWidth={1} />
            Register
          </Link>
        </div>
      </div>
    );
  }

  // Authenticated
  const dashboardLink = user.role === "admin" ? "/admin" : "/user";
  const tourRequestLink =
    user.role === "admin" ? "/admin/tour-request" : "/user/tour-request";
  const listingsLink =
    user.role === "admin" ? "/admin/listings" : "/user/listing/saved";
  const ListingsIcon = user.role === "admin" ? Building2 : HouseHeart;

  const links = [
    {
      href: dashboardLink,
      label: "Dashboard",
      icon: <LayoutDashboard className="w-6 h-6 mr-4" strokeWidth={1} />,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: <UserIcon className="w-6 h-6 mr-4" strokeWidth={1} />,
    },
    {
      href: tourRequestLink,
      label: "Tour Requests",
      icon: <Binoculars className="w-6 h-6 mr-4" strokeWidth={1} />,
    },
    {
      href: listingsLink,
      label: user.role === "admin" ? "Listings" : "Saved Listings",
      icon: <ListingsIcon className="w-6 h-6 mr-4" strokeWidth={1} />,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: <Settings className="w-6 h-6 mr-4" strokeWidth={1} />,
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Top links */}
      <div className={`flex flex-col ${spacing}`}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center px-4 py-2 rounded-lg text-lg ${
              isActive(link.href)
                ? "bg-purple-100 text-purple-700 font-semibold"
                : "text-gray-700 hover:text-purple-700 hover:bg-purple-100"
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </div>

      {/* Bottom logout */}
      <div className="mt-5 border-t border-gray-300 pt-5">
        <button
          onClick={onLogout}
          className="flex items-center px-4 py-2 text-gray-700 text-lg hover:text-purple-700 hover:bg-purple-100 rounded-lg text-left cursor-pointer w-full"
        >
          <LogOut className="w-6 h-6 mr-4" strokeWidth={1} />
          Logout
        </button>
      </div>
    </div>
  );
}