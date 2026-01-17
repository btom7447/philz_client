"use client";

import { ReactNode } from "react";

type DotPosition = "top" | "top-left" | "bottom-left";

interface StatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  dotPosition?: DotPosition;
}

export default function StatCard({
  icon,
  value,
  label,
  dotPosition = "top",
}: StatCardProps) {
  const dotPositionClasses: Record<DotPosition, string> = {
    top: "-top-1 left-1/2 -translate-x-1/2",
    "top-left": "-top-1 -left-1",
    "bottom-left": "-bottom-1 -left-1",
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="relative">
        <span
          className={`absolute w-5 h-5 rounded-full bg-purple-700/30 ${dotPositionClasses[dotPosition]}`}
        />
        <div className="text-purple-800">{icon}</div>
      </div>

      <div>
        <p className="font-semibold text-2xl lg:text-4xl text-black">{value}</p>
        <p className="mt-2 text-gray-500 font-roboto text-xl">{label}</p>
      </div>
    </div>
  );
}