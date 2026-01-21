"use client";

import { ChevronDown, LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  icon: LucideIcon;
  name: string;
  children: React.ReactNode;
  openByDefault?: boolean;
  active?: boolean;
  collapsed?: boolean; // new prop for sidebar shrink
}

export default function AccordionItem({
  icon: Icon,
  name,
  children,
  openByDefault = false,
  active = false,
  collapsed = false,
}: Props) {
  const [open, setOpen] = useState(openByDefault);
  const contentRef = useRef<HTMLDivElement>(null);

  // 🔑 keep accordion in sync with route
  useEffect(() => {
    setOpen(openByDefault);
  }, [openByDefault]);

  return (
    <div className="relative group">
      {/* ---------- Header ---------- */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-lg transition-colors
          ${
            active
              ? "bg-purple-700 text-white"
              : "text-gray-300 hover:bg-gray-800"
          }
          ${collapsed ? "justify-center" : "justify-between"}
        `}
      >
        <span
          className={`flex items-center gap-3 ${collapsed ? "justify-center w-full" : ""}`}
        >
          <Icon className="w-6 h-6" strokeWidth={1.5} />

          {!collapsed && name}
        </span>

        {/* Hide chevron when collapsed */}
        {!collapsed && (
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {/* Tooltip when collapsed */}
      {collapsed && (
        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg z-50">
          {name}
        </span>
      )}

      {/* ---------- Animated Content ---------- */}
      {!collapsed && (
        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: open ? `${contentRef.current?.scrollHeight}px` : "0px",
            opacity: open ? 1 : 0,
          }}
        >
          <div className="mt-1 space-y-1 pb-1 pt-2">{children}</div>
        </div>
      )}
    </div>
  );
}