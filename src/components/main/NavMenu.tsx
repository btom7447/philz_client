"use client";

import { createPortal } from "react-dom";
import Link from "next/link";
import { X } from "lucide-react";
import UserDropdown from "./UserDropdown";
import { navLinks } from "./navLinks";
import { usePathname } from "next/navigation";

interface NavMenuProps {
  open: boolean;
  onClose: () => void;
  user: any;
  onLogout?: () => void;
}

export default function NavMenu({
  open,
  onClose,
  user,
  onLogout,
}: NavMenuProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const menu = (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      {/* Blurred overlay */}
      <div
        className="fixed inset-0 backdrop-blur-xs bg-white/30"
        onClick={onClose}
      />

      {/* Side menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 flex flex-col overflow-y-scroll ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button onClick={onClose} aria-label="Close menu">
            <X className="w-7 h-7 text-gray-700" />
          </button>
        </div>

        {/* Nav links */}
        <ul className="flex flex-col gap-2 px-4 mt-2 font-roboto text-gray-700 text-lg">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className={`flex items-center px-4 py-2 rounded-lg text-lg ${
                  isActive(link.href)
                    ? "bg-purple-100 text-purple-700 font-semibold"
                    : "text-gray-700 hover:text-purple-700 hover:bg-purple-100"
                }`}
              >
                {link.icon && (
                  <link.icon className="w-6 h-6 mr-3" strokeWidth={1} />
                )}
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Separator */}
        <hr className="border-gray-300 my-5 mx-4" />

        {/* User dropdown */}
        <div className="flex flex-col gap-2 px-4 pb-6">
          <UserDropdown user={user} onLogout={onLogout} isMobile />
        </div>
      </div>
    </div>
  );

  return createPortal(menu, document.body);
}