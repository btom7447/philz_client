"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import SearchInput from "../admin/properties/SearchInput";
import SelectFilter from "../admin/properties/SelectFilter";
import { AMENITY_ICONS } from "@/app/utils/icons";
import { ChevronDown, ListRestart, SlidersHorizontal } from "lucide-react";
import {
  PropertyFilters,
  PropertyTypeOption,
  PropertyStatusOption,
  PropertyType,
  PropertyStatus,
} from "@/app/types/Properties";

interface Props {
  onChange: (filters: PropertyFilters) => void;
  amenities: string[];
}

export default function PropertiesFilter({ onChange, amenities }: Props) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState<PropertyTypeOption>("all");
  const [status, setStatus] = useState<PropertyStatusOption>("all");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const computedFilters = useMemo(
    () => ({
      title: title || undefined,
      location: location || undefined,
      propertyType:
        propertyType !== "all" ? (propertyType as PropertyType) : undefined,
      status: status !== "all" ? (status as PropertyStatus) : undefined,
      maxPrice: maxPrice === "" ? undefined : maxPrice,
      amenities: selectedAmenities.length ? selectedAmenities : undefined,
    }),
    [title, location, propertyType, status, maxPrice, selectedAmenities],
  );

  const toggleAmenity = (key: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(key) ? prev.filter((a) => a !== key) : [...prev, key],
    );
  };

  const handleReset = () => {
    setTitle("");
    setLocation("");
    setPropertyType("all");
    setStatus("all");
    setMaxPrice("");
    setSelectedAmenities([]);
    onChange({});
  };

  const handleSearch = () => {
    onChange(computedFilters);
  };

  // Measure content height for smooth toggle
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [amenitiesOpen, amenities]);

  return (
    <div className="bg-white xl:p-5 rounded-lg shadow-md w-full flex flex-col gap-5">
      {/* Full width filter inputs */}
      <SearchInput value={title} onChange={setTitle} placeholder="Title" />
      <SearchInput
        value={location}
        onChange={setLocation}
        placeholder="Location"
      />
      <SelectFilter
        value={propertyType}
        onChange={setPropertyType}
        placeholder="Property Type"
        options={[
          { value: "all", label: "All Types" },
          { value: "apartment", label: "Apartment" },
          { value: "house", label: "House" },
          { value: "office", label: "Office" },
          { value: "shop", label: "Shop" },
        ]}
      />
      <SelectFilter
        value={status}
        onChange={setStatus}
        placeholder="Status"
        options={[
          { value: "all", label: "All Status" },
          { value: "for sale", label: "For Sale" },
          { value: "for rent", label: "For Rent" },
        ]}
      />
      <SearchInput
        value={maxPrice.toString()}
        onChange={(v) =>
          setMaxPrice(v === "" ? "" : Number(v.replace(/[^0-9]/g, "")))
        }
        placeholder="Max Price"
      />

      {/* Amenities accordion */}
      <div className="w-full">
        <button
          className="w-full text-left font-medium text-lg py-2 px-3 border-b border-gray-200 hover:bg-gray-50 transition flex justify-between items-center cursor-pointer"
          onClick={() => setAmenitiesOpen((o) => !o)}
        >
          Amenities
          <ChevronDown
            size={18}
            strokeWidth={1}
            className={`text-gray-500 transition-transform duration-300 ${
              amenitiesOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-300"
          style={{
            maxHeight: amenitiesOpen ? `${contentHeight}px` : "0px",
          }}
        >
          <div className="flex flex-wrap gap-2 mt-2 w-full">
            {amenities.map((key) => {
              const active = selectedAmenities.includes(key);
              const icon = AMENITY_ICONS[key]?.icon;
              return (
                <button
                  key={key}
                  onClick={() => toggleAmenity(key)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm border transition w-full sm:w-auto cursor-pointer ${
                    active
                      ? "bg-purple-700 text-white border-purple-700"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-purple-100 hover:text-purple-700"
                  }`}
                >
                  {icon}
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 mt-4 w-full">
        <button
          onClick={handleSearch}
          className="w-full flex items-center justify-center gap-3 text-lg bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 transition cursor-pointer"
        >
          <SlidersHorizontal size={18} strokeWidth={1} />
          Search
        </button>
        <button
          onClick={handleReset}
          className="w-full  flex items-center justify-center gap-3 text-lg bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition cursor-pointer"
        >
          <ListRestart size={18} strokeWidth={1} />
          Reset
        </button>
      </div>
    </div>
  );
}