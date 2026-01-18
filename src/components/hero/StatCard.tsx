"use client";

import { ReactNode } from "react";

type DotPosition = "top" | "top-left" | "bottom-left";

interface StatCardProps {
  icon: ReactNode;
  value: ReactNode;
  label: string;
  dotPosition?: DotPosition;
  about?: boolean;
}

export default function StatCard({
  icon,
  value,
  label,
  dotPosition = "top",
  about = false,
}: StatCardProps) {
  const textColor = about ? "text-white" : "text-black";
  const subTextColor = about ? "text-white/80" : "text-gray-500";
  const iconColor = about ? "text-white" : "text-purple-700";
  const dotColor = about ? "bg-white/60" : "bg-purple-600/40";

  return (
    <div className="relative flex items-center gap-4">
      {/* Decorative Dot */}
      <span
        className={`absolute w-5 h-5 rounded-full ${dotColor}
          ${dotPosition === "top" ? "-top-2 left-1/2 -translate-x-1/2" : ""}
          ${dotPosition === "top-left" ? "-top-1 left-1" : ""}
          ${dotPosition === "bottom-left" ? "-bottom-1 left-2" : ""}
        `}
      />

      <div className={iconColor}>{icon}</div>

      <div>
        <div className={`text-3xl xl:text-5xl font-light font-lora ${textColor}`}>
          {value}
        </div>
        <p className={`text-lg font-roboto ${subTextColor}`}>
          {label}
        </p>
      </div>
    </div>
  );
}