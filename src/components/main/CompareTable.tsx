"use client";

import { useEffect, useState } from "react";
import { IProperty } from "@/app/types/Properties";
import { filterCompareProperties } from "@/app/utils/compareUtils";
import Image from "next/image";
import { optimizeCloudinary } from "@/app/utils/optimizeCloudinary";
import EmptySlate from "./EmptySlate";
import { AMENITY_ICONS } from "@/app/utils/icons";
import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";

interface AmenityDisplayProps {
  amenities: string[];
  isOpen: boolean;
}

const AmenityDisplay: React.FC<AmenityDisplayProps> = ({
  amenities,
  isOpen,
}) => {
  if (!amenities?.length) return <span className="text-gray-400">None</span>;

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-96" : "max-h-0"
      }`}
    >
      <div className="flex flex-col gap-2 mt-2">
        {amenities.map((a) => {
          const match = Object.values(AMENITY_ICONS).find((icon) =>
            icon.keywords.some((k) =>
              a.toLowerCase().includes(k.toLowerCase()),
            ),
          );

          return (
            <span
              key={a}
              className="flex items-center gap-2 text-lg font-light text-gray-700"
            >
              {match?.icon || null} {a}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default function CompareTable() {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [openRow, setOpenRow] = useState<string | null>(null);

  const fetchCompareProperties = async () => {
    try {
      const res = await fetch("/api/properties");
      const json = await res.json();
      const allProperties: IProperty[] = Array.isArray(json.properties)
        ? json.properties
        : [];
      const selected = filterCompareProperties(allProperties);
      setProperties(selected);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCompareProperties();

    const onCompareUpdate = () => fetchCompareProperties();
    window.addEventListener("compareUpdate", onCompareUpdate);
    window.addEventListener("storage", (e) => {
      if (e.key === "compare") fetchCompareProperties();
    });

    return () => {
      window.removeEventListener("compareUpdate", onCompareUpdate);
    };
  }, []);

  if (!properties.length) {
    return (
      <div className="my-20">
        <EmptySlate
          title="No properties selected"
          subtitle="Select properties to compare and they will appear here."
        />
      </div>
    );
  }

  const fields: { label: string; key: keyof IProperty }[] = [
    { label: "Image", key: "images" },
    { label: "Title", key: "title" },
    { label: "Price", key: "price" },
    { label: "Area (sqft)", key: "area" },
    { label: "Bedrooms", key: "bedrooms" },
    { label: "Bathrooms", key: "bathrooms" },
    { label: "Toilets", key: "toilets" },
    { label: "Parking Space", key: "garages" },
    { label: "Property Type", key: "propertyType" },
    { label: "Status", key: "status" },
    { label: "Year Built", key: "yearBuilt" },
    { label: "Amenities", key: "amenities" },
    { label: "Address", key: "address" },
  ];

  const toggleRow = (key: string) => {
    setOpenRow(openRow === key ? null : key);
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-5 xl:px-0 overflow-x-auto border border-gray-300 rounded-lg">
      <table className="min-w-full border-collapse">
        <tbody>
          {fields.map((field, index) => (
            <tr
              key={field.key as string}
              className={`border-b border-gray-200 ${
                index % 2 === 0 ? "bg-white" : "bg-purple-50"
              }`}
            >
              <th
                className={`text-left px-4 py-2 w-44 text-black text-lg font-semibold bg-purple-100 ${
                  field.key === "amenities" ? "cursor-pointer" : ""
                }`}
                onClick={() =>
                  field.key === "amenities" && toggleRow(field.key as string)
                }
              >
                <div className="flex items-center justify-between">
                  {field.label}
                  {field.key === "amenities" && (
                    <ChevronDown
                      size={16}
                      strokeWidth={1 }
                      className={`transition-transform duration-300 ${
                        openRow === field.key ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  )}
                </div>
              </th>
              {properties.map((prop) => {
                let content: ReactNode = prop[field.key];

                switch (field.key) {
                  case "images":
                    content = prop.images?.[0]?.url ? (
                      <div className="w-30 h-25 relative">
                        <Image
                          src={optimizeCloudinary(prop.images[0].url, 300)}
                          alt={prop.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    ) : (
                      <span className="text-left">No Image</span>
                    );
                    break;
                  case "price":
                    content = (
                      <span className="text-left">
                        ₦{prop.price.toLocaleString()}
                      </span>
                    );
                    break;
                  case "amenities":
                    content = (
                      <AmenityDisplay
                        amenities={prop.amenities || []}
                        isOpen={openRow === field.key}
                      />
                    );
                    break;
                  case "address":
                    content = (
                      <div className="text-left">
                        {prop.address?.city}, {prop.address?.state}
                      </div>
                    );
                    break;
                  default:
                    content = (
                      <span className="text-left">
                        {prop[field.key] || "-"}
                      </span>
                    );
                    break;
                }

                return (
                  <td key={prop._id} className="px-4 py-2 text-left align-top">
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}