"use client";

import { useState, useEffect } from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

interface PropertiesFilterProps {
  onChange: (filters: {
    title?: string;
    location?: string;
    propertyType?: string;
    status?: "for rent" | "for sale";
    maxPrice?: number;
  }) => void;
}

export default function PropertiesFilter({ onChange }: PropertiesFilterProps) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [status, setStatus] = useState("all");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  useEffect(() => {
    onChange({
      title: title || undefined,
      location: location || undefined,
      propertyType: propertyType !== "all" ? propertyType : undefined,
      status:
        status === "for rent"
          ? "for rent"
          : status === "for sale"
            ? "for sale"
            : undefined,
      maxPrice: maxPrice === "" ? undefined : maxPrice,
    });
  }, [title, location, propertyType, status, maxPrice, onChange]);

  return (
    <div className="flex flex-col gap-4 bg-white p-5 rounded-lg shadow-md">
      {/* Title & Location */}
      <div className="flex flex-col lg:flex-row gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search by title"
          className="w-full p-3 border rounded-md outline-none"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City or State"
          className="w-full p-3 border rounded-md outline-none"
        />
      </div>

      {/* Property Type & Status */}
      <div className="flex flex-col lg:flex-row gap-4">
        <Select.Root value={propertyType} onValueChange={setPropertyType}>
          <Select.Trigger className="w-full p-3 border rounded-md flex justify-between items-center">
            <Select.Value placeholder="Property Type" />
            <Select.Icon>
              <ChevronDown size={18} />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="bg-white rounded-md shadow-md">
              <Select.Viewport className="p-2">
                {["all", "house", "apartment", "office", "shop"].map((type) => (
                  <Select.Item
                    key={type}
                    value={type}
                    className="px-4 py-2 rounded-md cursor-pointer hover:bg-purple-100"
                  >
                    <Select.ItemText>
                      {type === "all"
                        ? "All Types"
                        : type.replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        <Select.Root value={status} onValueChange={setStatus}>
          <Select.Trigger className="w-full p-3 border rounded-md flex justify-between items-center">
            <Select.Value placeholder="Status" />
            <Select.Icon>
              <ChevronDown size={18} />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="bg-white rounded-md shadow-md">
              <Select.Viewport className="p-2">
                {["all", "for rent", "for sale"].map((s) => (
                  <Select.Item
                    key={s}
                    value={s}
                    className="px-4 py-2 rounded-md cursor-pointer hover:bg-purple-100"
                  >
                    <Select.ItemText>
                      {s === "all"
                        ? "All Status"
                        : s
                            .replace("-", " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      {/* Max Price */}
      <div className="flex flex-col lg:flex-row gap-4">
        // Inside the Max Price input
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => {
            const value = e.target.value;
            setMaxPrice(value === "" ? "" : Number(value));
          }}
          placeholder="Max Price"
          className="w-full p-3 border rounded-md outline-none"
        />
      </div>
    </div>
  );
}