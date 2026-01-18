"use client";

import { useState, useEffect } from "react";
import { Briefcase, Smile, CheckCircle } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

import FilterInput from "./FilterInput";
import StatCard from "./StatCard";
import { philzStats, PhilzStatKey } from "@/app/lib/philzStats";

import { ReactNode } from "react";

const heroStats: {
  icon: ReactNode;
  key: PhilzStatKey;
  dotPosition: "top" | "top-left" | "bottom-left";
}[] = [
  {
    icon: <CheckCircle className="w-15 h-15" strokeWidth={1} />,
    key: "premiumProperties",
    dotPosition: "top",
  },
  {
    icon: <Smile className="w-15 h-15" strokeWidth={1} />,
    key: "happyCustomers",
    dotPosition: "bottom-left",
  },
  {
    icon: <Briefcase className="w-15 h-15" strokeWidth={1} />,
    key: "yearsInBusiness",
    dotPosition: "top-left",
  },
];

export default function HeroText() {
  const [filters, setFilters] = useState({
    status: "all",
    propertyType: "",
    location: "",
  });

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  return (
    <div className="space-y-8 relative">
      {/* Heading */}
      <div className="space-y-4">
        <h1
          data-aos="fade-right"
          className="text-4xl font-lora font-light text-black leading-tight"
        >
          Exploring Unique <br />
          <span className="text-5xl md:text-6xl font-semibold text-purple-800">
            Properties In Market
          </span>
        </h1>

        <p
          data-aos="fade-right"
          data-aos-delay="200"
          className="text-lg md:text-2xl font-roboto text-gray-700"
        >
          Discover exceptional listings that blend functionality and style,
          perfect for investing, working, or calling home.
        </p>
      </div>

      {/* Filter */}
      <div data-aos="fade-right" data-aos-delay="500" className="my-20">
        <FilterInput onFilterChange={(f) => setFilters(f)} />
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-10 justify-center items-center">
        {heroStats.map((stat, index) => {
          const data = philzStats[stat.key];

          return (
            <div key={stat.key} data-aos="fade-up" data-aos-delay={index * 200}>
              <StatCard
                icon={stat.icon}
                value={`${data.value.toLocaleString()}${data.suffix}`}
                label={data.label}
                dotPosition={stat.dotPosition}
                about={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}