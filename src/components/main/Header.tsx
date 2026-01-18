"use client";

import { useAuthStore } from "@/app/store/useAuthStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User as UserIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import UserDropdown from "./UserDropdown";
import NavMenu from "./NavMenu";
import { navLinks } from "./navLinks";

export default function Header() {
  const user = useAuthStore((state) => state.user);

  const logout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      useAuthStore.getState().logout();
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [prevIndex, setPrevIndex] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-40">
      <nav className="max-w-7xl mx-auto py-4 px-5 xl:px-0 flex items-center justify-between">
        <div className="flex gap-10 items-center justify-between lg:justify-start w-full md:w-auto">
          <Link href="/" className="block relative w-25 h-20">
            <Image
              src="/logo_one.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </Link>

          <button
            className="md:hidden text-black"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-8 h-8" strokeWidth={1} />
          </button>

          <ul className="hidden md:flex space-x-6 font-roboto text-gray-700 ml-10">
            {navLinks.map((link, index) => {
              const active = isActive(link.href);

              const direction =
                index > prevIndex ? "origin-left" : "origin-right";

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setPrevIndex(index)}
                    className={`relative text-xl font-extralight pb-2 px-1 transition-colors
                      ${
                        active
                          ? "text-purple-800 font-light"
                          : "text-gray-700 hover:text-purple-500"
                      }
                    `}
                  >
                    {link.name}

                    {/* Active underline */}
                    <span
                      className={`
                        absolute left-0 -bottom-2 h-0.5 w-full
                        bg-purple-700
                        transition-transform duration-300 ease-out
                        ${active ? "scale-x-100" : "scale-x-0"}
                        ${active ? direction : ""}
                      `}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/book-tour"
            className="px-12 py-4 rounded-lg bg-purple-700 text-white text-xl font-light hover:bg-purple-800 transition"
          >
            Book Tour
          </Link>

          {/* User icon triggers dropdown */}
          <div className="relative group">
            <button className="w-15 h-15 rounded-full bg-gray-200 flex items-center justify-center hover:ring-1 hover:ring-purple-700 cursor-pointer transition">
              {user ? (
                // Authenticated
                user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 font-light text-2xl flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )
              ) : (
                // Not authenticated
                <UserIcon className="text-gray-500 w-7 h-7" />
              )}
            </button>

            <div className="absolute right-0 mt-7 w-60 bg-white shadow-lg rounded-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <UserDropdown user={user} onLogout={logout} />
            </div>
          </div>
        </div>
      </nav>

      <NavMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        user={user}
        onLogout={logout}
      />
    </header>
  );
}