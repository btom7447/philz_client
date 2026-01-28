"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

type BreadcrumbProps = {
  title: string;
  current: string;
  parent?: {
    label: string;
    href: string;
  };
  backgroundImage: string;
};

export default function Breadcrumb({
  title,
  current,
  parent,
  backgroundImage,
}: BreadcrumbProps) {
  return (
    <section
      aria-label="Breadcrumb"
      className="relative overflow-hidden py-20 lg:py-30 xl:py-40"
      style={
        {
          "--breadcrumb-bg": `url(${backgroundImage})`,
        } as React.CSSProperties
      }
    >
      {/* Background image */}
      <div className="absolute inset-0 before:absolute before:inset-0 before:bg-(image:--breadcrumb-bg) before:bg-cover before:bg-center before:content-[''] before:brightness-20" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-5 xl:px-0 text-white">
        <nav className="text-xl leading-relaxed mb-5 flex flex-wrap items-center">
          <Link href="/" className="hover:text-purple-700">
            Home
          </Link>

          <ChevronRight className="w-7 h-17" strokeWidth={1} />

          {parent && (
            <>
              <Link href={parent.href} className="hover:text-purple-700">
                {parent.label}
              </Link>
              <ChevronRight className="w-7 h-17" strokeWidth={1} />
            </>
          )}

          <span className="text-xl leading-relaxed">{current}</span>
        </nav>

        {/* Page title */}
        <h1 className="text-3xl lg:text-5xl font-bold">{title}</h1>
      </div>
    </section>
  );
}