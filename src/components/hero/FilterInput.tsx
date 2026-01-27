"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { PropertyTypeOption, PropertyStatusOption } from "@/app/types/Properties";

interface FilterInputProps {
  onFilterChange: (filters: {
    status: string;
    propertyType: string;
    location: string;
  }) => void;
}

export default function FilterInput({ onFilterChange }: FilterInputProps) {
  const router = useRouter();

  const [status, setStatus] = useState<PropertyStatusOption>("all");
  const [propertyType, setPropertyType] = useState<PropertyTypeOption>("all");
  const [location, setLocation] = useState("");
  const tabs: PropertyStatusOption[] = ["all", "for rent", "for sale"];
  const [prevIndex, setPrevIndex] = useState(0);

  // Build query object for /properties
  const buildQuery = () => {
    const query: Record<string, string> = {};

    if (status !== "all") query.status = status;
    if (propertyType !== "all") query.propertyType = propertyType;
    if (location.trim()) query.location = location.trim();

    return query;
  };

  const handleSearch = () => {
    const query = buildQuery();
    const params = new URLSearchParams(query).toString();

    router.push(`/properties?${params}`);

    // Notify parent
    onFilterChange({
      status,
      propertyType,
      location,
    });

    // Reset inputs
    setLocation("");
    setStatus("all");
    setPropertyType("all");
    setPrevIndex(0);
  };

  const handleChange = (
    newStatus = status,
    newType = propertyType,
    newLoc = location,
  ) => {
    setStatus(newStatus);
    setPropertyType(newType);
    setLocation(newLoc);
  };

  return (
    <div className="bg-transparent w-full max-w-none relative">
      {/* Tabs (Top) */}
      <div className="status-bar px-5 pt-5 border-b border-gray-200 w-fit bg-white rounded-t-lg">
        <div className="flex gap-5">
          {tabs.map((s) => {
            const currentIndex = tabs.indexOf(s);
            const isActive = status === s;
            const direction =
              currentIndex > prevIndex ? "origin-left" : "origin-right";

            const label =
              s === "all"
                ? "All"
                : s
                    .split(" ")
                    .map((w) => w[0].toUpperCase() + w.slice(1))
                    .join(" "); // capitalizes each word

            return (
              <button
                key={s}
                onClick={() => {
                  setPrevIndex(currentIndex);
                  handleChange(s, propertyType, location);
                }}
                className={`relative text-xl text-gray-500 font-roboto  pb-2 px-3 transition-colors hover:cursor-pointer ${
                  isActive ? "text-black" : "hover:text-black"
                }`}
              >
                {label}
                <span
                  className={`
                    absolute left-0 -bottom-0.5 h-0.5 w-full
                    bg-purple-700
                    transition-transform duration-300 ease-out
                    ${isActive ? "scale-x-100" : "scale-x-0"}
                    ${isActive ? direction : ""}
                  `}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="status-bar bg-white px-5 rounded-tr-lg shadow-2xl">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col xl:flex-row gap-3">
            <input
              type="text"
              value={location}
              onChange={(e) =>
                handleChange(status, propertyType, e.target.value)
              }
              placeholder="Enter an address, neighbourhood, city, or Zip code"
              className="w-full xl:w-2/3 bg-white py-5 outline-none font-roboto text-black text-xl placeholder:text-gray-500 placeholder:text-xl"
            />

            <div className="border-t border-gray-200 xl:border-t-0 xl:border-l w-full xl:w-1/3 relative">
              <Select.Root
                value={propertyType}
                onValueChange={(value) =>
                  handleChange(status, value as PropertyTypeOption, location)
                }
              >
                <Select.Trigger
                  className={`
                    w-full bg-white p-5
                    font-roboto text-lg outline-none
                    cursor-pointer flex items-center justify-between
                    ${propertyType !== "all" ? "text-black" : "text-gray-500"}
                  `}
                >
                  <Select.Value placeholder="Property Type" />
                  <Select.Icon className="text-gray-400">
                    <ChevronDown size={18} />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content
                    className="bg-white rounded-lg shadow-xl overflow-hidden z-50 outline-0"
                    sideOffset={10}
                  >
                    <Select.Viewport className="p-2 outline-0">
                      <Select.Item
                        value="all"
                        className="px-4 py-3 text-lg text-gray-500 font-roboto cursor-pointer
                           focus:text-purple-700 rounded-lg data-[state=checked]:text-purple-700 data-[state=checked]:bg-purple-200 outline-0"
                      >
                        <Select.ItemText>Property Type</Select.ItemText>
                      </Select.Item>

                      <div className="my-1 h-px bg-gray-100" />

                      {["apartment", "house", "office", "shop"].map((type) => (
                        <Select.Item
                          key={type}
                          value={type}
                          className="px-4 py-3 text-lg font-roboto cursor-pointer
                             text-gray-700 rounded-lg focus:text-purple-700 data-[state=checked]:text-purple-700 data-[state=checked]:bg-purple-200 outline-0"
                        >
                          <Select.ItemText>
                            {type.replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="input-bar
          w-full flex items-center justify-center gap-3
          bg-purple-700 text-white
          font-roboto text-xl
          px-6 py-4 rounded-b-lg
          hover:bg-purple-800 transition cursor-pointer
        "
      >
        <SlidersHorizontal className="w-8 h-8" />
        Search Properties
      </button>
    </div>
  );
}