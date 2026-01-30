"use client";

import { useState } from "react";
import { IProperty } from "@/app/types/Properties";
import { optimizeCloudinary } from "@/app/utils/optimizeCloudinary";

interface Props {
  property: IProperty;
}

export default function PropertyFloorPlans({ property }: Props) {
  const floorPlans = property?.floorPlans;
  if (!floorPlans || floorPlans.length === 0) return null;

  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const activePlan = floorPlans[activeIndex];

  return (
    <section className="py-10 w-full px-5 xl:px-0">
      <div className="max-w-7xl mx-auto">
        <div className="border-l-2 border-purple-700 px-5 py-2 mt-10 mb-5">
          <h2 className="text-3xl font-semibold">Floor Plan</h2>
        </div>
        {/* Tabs */}
        <div className="status-bar border-b border-gray-200 w-fit bg-white rounded-t-lg">
          <div className="flex">
            {floorPlans.map((_, index) => {
              const isActive = activeIndex === index;
              const direction =
                index > prevIndex ? "origin-left" : "origin-right";

              return (
                <button
                  key={index}
                  onClick={() => {
                    setPrevIndex(activeIndex);
                    setActiveIndex(index);
                  }}
                  className={`relative py-3 px-8 text-lg flex items-center justify-center font-medium text-gray-600 transition-colors cursor-pointer
                  ${isActive ? "text-black" : "hover:text-black"}`}
                >
                  {index + 1}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-0.5 w-full bg-purple-700
                    transition-transform duration-300 ease-out
                    ${isActive ? "scale-x-100" : "scale-x-0"} ${isActive ? direction : ""}`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Floor plan image */}
        <div className="status-bar p-5 relative w-full h-60 lg:h-105 overflow-hidden bg-white rounded-b-lg rounded-r-lg">
          <img
            src={optimizeCloudinary(activePlan.url, 600)}
            alt={`Floor Plan ${activeIndex + 1}`}
            className="w-full h-full object-contain transition-transform duration-300 ease-out"
          />
        </div>
      </div>
    </section>
  );
}