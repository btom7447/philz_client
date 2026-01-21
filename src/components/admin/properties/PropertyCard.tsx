"use client";

import { FC } from "react";
import { Bed, Bath, Ruler, Pencil, Trash2, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import { IProperty } from "./PropertiesList";
import AmenityIcon from "@/components/main/AmenityIcon";

interface Props {
  property: IProperty;
  view: "grid" | "list";
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  collapsed: boolean;
}

const PropertyCard: FC<Props> = ({ property, view, onSelect, onDelete, collapsed }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => onSelect(property._id)}
      className={`relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg transition
        ${view === "list" ? "flex gap-4 p-4" : ""}`}
    >
      {/* Pills */}
      <div
        className={`absolute flex gap-2 z-10 ${
          view === "list" ? "top-7 left-7 " : "top-3 right-3"
        }`}
      >
        <span
          className={`px-5 py-1 text-md font-light rounded-full ${
            property.status === "for sale"
              ? "bg-green-100 text-green-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {property.status}
        </span>

        {property.featured && (
          <span className="px-5 py-1 text-md rounded-full bg-purple-100 text-purple-700 flex items-center gap-1">
            Featured
          </span>
        )}
      </div>

      {/* Image */}
      <div
        className={`bg-gray-100 overflow-hidden ${view === "list" ? "w-1/2 rounded-lg" : "h-70"}`}
      >
        <img
          src={property.images?.[0] || "/placeholder-property.jpg"}
          alt={property.title}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Content */}
      <div className={`${view === "list" ? "flex-1" : "p-4"}`}>
        <h3 className="font-semibold text-xl truncate">{property.title}</h3>
        <p className="text-lg text-gray-500">
          {property.address.city}, {property.address.state}
        </p>
        <p className="my-2 text-xl font-semibold text-purple-700">
          ₦{property.price.toLocaleString()}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mt-3 text-gray-600 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            {property.amenities.slice(0, view === "list" ? 6 : 4).map((a) => (
              <AmenityIcon key={a} amenity={a} />
            ))}

            {property.amenities.length > (view === "list" ? 6 : 4) && (
              <span className="text-gray-500 text-md">
                +{property.amenities.length - (view === "list" ? 6 : 4)} more
              </span>
            )}
          </div>

          {/* Always show bedrooms, bathrooms, area */}
          <AmenityIcon amenity={`${property.bedrooms} Bedrooms`} />
          <AmenityIcon amenity={`${property.bathrooms} Bathrooms`} />
          <AmenityIcon amenity={`${property.area} sqft`} />
        </div>

        {/* Actions */}
        <div className="border-t border-gray-400 mt-4 pt-3 flex flex-col md:flex-row gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/admin/properties/${property._id}`);
            }}
            className="flex-1 flex items-center justify-center gap-2 border border-purple-700 bg-purple-100 rounded-lg py-2 text-lg hover:bg-purple-700 text-purple-700 hover:text-white transition cursor-pointer"
          >
            <SquarePen size={16} strokeWidth={1} />
            Edit
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(property._id);
            }}
            className="flex-1 flex items-center justify-center gap-2 border border-red-700 bg-red-100 rounded-lg py-2 text-lg hover:bg-red-700 text-red-700 hover:text-white transition cursor-pointer"
          >
            <Trash2 size={16} strokeWidth={1} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;