"use client";

import { useEffect, useState } from "react";
import PropertyCard from "../main/PropertyCard";
import EmptySlate from "../main/EmptySlate";
import AOS from "aos";
import "aos/dist/aos.css";
import { IProperty, PropertyType } from "@/app/types/Properties";

const TABS: ("all" | PropertyType)[] = [
  "all",
  "house",
  "apartment",
  "office",
  "shop",
];

export default function RecentProperties() {
  const [activeTab, setActiveTab] = useState<"all" | PropertyType>("all");
  const [prevIndex, setPrevIndex] = useState(0);
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/properties");
        const json = await res.json();

        const data: IProperty[] = Array.isArray(json.properties)
          ? json.properties
          : [];
        setProperties(data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  // Filter & get most recent 6
  const filteredProperties = properties
    .filter((p) => (activeTab === "all" ? true : p.propertyType === activeTab))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 6);

  const isEmpty = !loading && filteredProperties.length === 0;

  // Skeleton setup
  const skeletonCount = 6;
  const skeletonHeight = "h-140";

  return (
    <section className="w-full my-20">
      <div className="space-y-4">
        <h1
          data-aos="fade-down"
          className="text-4xl text-center font-lora font-light text-black leading-tight"
        >
          Explore Our Recent <br />
        </h1>
        <span
          data-aos="fade-up"
          data-aos-delay="200"
          className="block text-center text-5xl md:text-6xl font-semibold text-purple-800"
        >
          Listed Properties
        </span>
      </div>

      {/* Tabs */}
      <div className="mx-auto w-fit my-10 pt-5 border-b border-gray-200 flex justify-center gap-10">
        {TABS.map((tab, index) => {
          const isActive = tab === activeTab;
          const direction = index > prevIndex ? "origin-left" : "origin-right";

          return (
            <button
              key={tab}
              onClick={() => {
                setPrevIndex(index);
                setActiveTab(tab);
              }}
              className={`relative pb-3 px-3 text-xl font-roboto transition-colors cursor-pointer ${
                isActive ? "text-black" : "text-gray-500 hover:text-black"
              }`}
            >
              {tab === "all"
                ? "All"
                : tab.replace(/\b\w/g, (l) => l.toUpperCase())}

              <span
                className={`
                  absolute left-0 -bottom-0.5 h-0.5 w-full bg-purple-700
                  transition-transform duration-300 ease-out
                  ${isActive ? "scale-x-100" : "scale-x-0"}
                  ${isActive ? direction : ""}
                `}
              />
            </button>
          );
        })}
      </div>

      {/* Grid / Loader / Empty */}
      <div className="w-full min-h-[50vh] flex justify-center items-start overflow-hidden z-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 w-full">
            {Array.from({ length: skeletonCount }).map((_, idx) => (
              <div
                key={idx}
                className={`animate-pulse bg-gray-200 rounded-lg ${skeletonHeight} w-full`}
              />
            ))}
          </div>
        ) : isEmpty ? (
          <EmptySlate
            title="No properties found"
            subtitle="Try a different type"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 items-stretch">
            {filteredProperties.map((property, index) => (
              <div
                key={property._id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-once="true"
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}