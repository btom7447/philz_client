"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminLinks } from "./adminLinks";
import { LogOut, Menu, SidebarClose, SidebarOpen } from "lucide-react";
import { useAuthStore } from "app/store/useAuthStore";
import Image from "next/image";
import AccordionItem from "./AccordionItem";
import { useState, useEffect } from "react";

const LOCALSTORAGE_KEY = "admin_sidebar_collapsed";

export default function AdminSidebar({
  user,
  onClose,
}: {
  user: { name: string; role: string };
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const logout = useAuthStore((s) => s.logout);

  const [collapsed, setCollapsed] = useState(false);
  const [hoveredLogo, setHoveredLogo] = useState(false);

  // Initialize collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCALSTORAGE_KEY);
    if (saved !== null) {
      setCollapsed(saved === "true");
    }
  }, []);

  // Sync localStorage whenever collapsed changes
  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_KEY, collapsed.toString());
  }, [collapsed]);

  const isExact = (href: string) => pathname === href;
  const isSectionActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  /* Handle collapse toggle */
  const handleCollapseToggle = () => {
    setCollapsed((c) => !c);
    if (!collapsed) {
      // When collapsing, optionally navigate home
      // window.location.href = "/";
    }
  };

  return (
    <aside
      className={`pt-10 bg-gray-900 flex flex-col h-full transition-all duration-300 ${
        collapsed ? "w-20" : "w-65"
      }`}
    >
      <div
        className="flex items-center justify-between px-2 mb-10 relative"
        onMouseEnter={() => collapsed && setHoveredLogo(true)}
        onMouseLeave={() => collapsed && setHoveredLogo(false)}
      >
        {/* Logo as button */}
        <button
          onClick={handleCollapseToggle}
          className={`p-1 rounded-lg cursor-pointer bg-white transition-all duration-300 ${
            collapsed ? "mx-auto" : ""
          }`}
        >
          {!collapsed || !hoveredLogo ? (
            <Image
              src="/logo_one.png"
              alt="Philz Properties Logo"
              width={collapsed ? 30 : 70}
              height={collapsed ? 50 : 70}
              className="object-contain"
            />
          ) : (
            <SidebarOpen className="w-8 h-8 text-gray-900" strokeWidth={1} />
          )}
        </button>

        {/* Collapse button only visible when not collapsed */}
        {!collapsed && (
          <SidebarClose
            strokeWidth={1}
            onClick={handleCollapseToggle}
            className="hidden lg:block w-8 h-8 text-gray-300 hover:text-white cursor-pointer"
          />
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-2 space-y-1">
        {adminLinks.map((link) => {
          /** ---------------- NORMAL LINK ---------------- */
          if ("href" in link) {
            const active =
              link.href === "/admin"
                ? isExact(link.href)
                : isSectionActive(link.href);

            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-lg transition-colors
                  ${active ? "bg-purple-700 text-white" : "text-gray-300 hover:bg-gray-800"}
                  ${collapsed ? "justify-center" : "justify-start"}
                `}
              >
                <Icon className="w-6 h-6" strokeWidth={1.5} />

                {!collapsed && link.name}

                {/* Tooltip when collapsed */}
                {collapsed && (
                  <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg z-50">
                    {link.name}
                  </span>
                )}
              </Link>
            );
          }

          /** ---------------- ACCORDION ---------------- */
          const Icon = link.icon;
          const hasActiveChild = link.children.some((c) => isExact(c.href));

          return (
            <AccordionItem
              key={link.name}
              icon={Icon}
              name={link.name}
              openByDefault={hasActiveChild}
              active={hasActiveChild}
              collapsed={collapsed} // <-- pass shrink state
            >
              {link.children.map((child) => {
                const active = isExact(child.href);
                const ChildIcon = child.icon;

                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-5 py-2 rounded-md text-lg transition-colors
                      ${
                        active
                          ? "border-l rounded-none border-purple-700 text-purple-700"
                          : "text-gray-400 hover:text-white hover:bg-gray-800"
                      }
                      ${collapsed ? "justify-center px-0" : "justify-start"}
                    `}
                  >
                    <ChildIcon className="w-5 h-5" strokeWidth={1.5} />

                    {!collapsed && child.name}

                    {collapsed && (
                      <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg z-50">
                        {child.name}
                      </span>
                    )}
                  </Link>
                );
              })}
            </AccordionItem>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={() => {
          logout();
          window.location.href = "/";
        }}
        className={`flex items-center gap-3 px-4 py-3 text-xl border-t border-gray-800 text-red-400 hover:bg-gray-800 transition-colors
          ${collapsed ? "justify-center" : ""}
        `}
      >
        <LogOut className="w-6 h-6" />
        {!collapsed && "Logout"}
      </button>
    </aside>
  );
}