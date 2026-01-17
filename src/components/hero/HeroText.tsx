"use client";

import { useState, useEffect } from "react";
import { Briefcase, Smile, CheckCircle } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import FilterInput from "./FilterInput";
import StatCard from "./StatCard";

export default function HeroText() {
  const [filters, setFilters] = useState({
    status: "all",
    propertyType: "",
    location: "",
  });

  // Initialize AOS
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
          <span className="lora text-5xl md:text-6xl font-semibold text-purple-800">
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
      {/* Filter Input */}
      <div data-aos="fade-right" data-aos-delay="500" className="my-20">
        <FilterInput onFilterChange={(f) => setFilters(f)} />
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-10 mt-6">
        {[
          {
            icon: <CheckCircle className="w-15 h-15" strokeWidth={1} />,
            value: "40,525+",
            label: "Premium Properties",
            dotPosition: "top" as const,
          },
          {
            icon: <Smile className="w-15 h-15" strokeWidth={1} />,
            value: "35,000+",
            label: "Happy Customers",
            dotPosition: "bottom-left" as const,
          },
          {
            icon: <Briefcase className="w-15 h-15" strokeWidth={1} />,
            value: "12,500+",
            label: "In Business",
            dotPosition: "top-left" as const,
          },
        ].map((stat, index) => (
          <div key={index} data-aos="fade-up" data-aos-delay={index * 200}>
            <StatCard
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              dotPosition={stat.dotPosition} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
