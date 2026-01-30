"use client";

import { FC } from "react";
import { Trash2, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import { IProperty } from "@/app/types/Properties";
import AmenityIcon from "@/components/main/AmenityIcon";
import { optimizeCloudinary } from "@/app/utils/optimizeCloudinary";

interface Props {
  property: IProperty;
  view: "grid" | "list";
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  collapsed: boolean;
}

const PropertyCard: FC<Props> = ({ property, view, onSelect, onDelete }) => {
  const router = useRouter();
  const hasImage = property.images && property.images.length > 0;

  return (
    <div
      onClick={() => onSelect(property._id)}
      className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer overflow-hidden h-full
    ${view === "list" ? "flex" : "flex flex-col"}`}
    >
      {/* Image */}
      {hasImage && (
        <div
          className={`relative overflow-hidden ${
            view === "list" ? "w-1/3 h-60" : "w-full h-64"
          }`}
        >
          <img
            src={
              property.images?.[0]?.url
                ? optimizeCloudinary(property.images[0].url, 600)
                : "/placeholder-property.jpg"
            }
            alt={property.title}
            className="w-full h-full object-cover object-top"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Status pill top-right */}
          <div className="absolute top-2 right-2 flex items-center gap-2">
            <div
              className=" px-3 py-1 rounded-full text-sm font-medium text-white shadow-sm z-10"
              style={{
                backgroundColor:
                  property.status === "for sale"
                    ? "#16a34a"
                    : property.status === "for rent"
                      ? "#3b82f6"
                      : "#7c3aed", // fallback purple for featured
              }}
            >
              {property.status}
            </div>

            {property.featured && (
              <span className="px-3 py-1 rounded-full bg-purple-700 text-white text-sm z-10">
                Featured
              </span>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div
        className={`flex flex-col justify-between p-4 ${
          view === "list" ? "flex-1" : "flex-1"
        }`}
      >
        <div className="border-b border-gray-300">
          <h3 className="font-semibold text-lg truncate">{property.title}</h3>
          <p className="text-md text-gray-500">
            {property.address.city}, {property.address.state}
          </p>
          <p className="my-2 text-xl font-semibold text-purple-700">
            ₦{property.price.toLocaleString()}
          </p>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mt-3 text-gray-600 text-sm">
          {property.amenities.slice(0, view === "list" ? 6 : 4).map((a) => (
            <AmenityIcon key={a} amenity={a} />
          ))}
          {property.amenities.length > (view === "list" ? 6 : 4) && (
            <span className="text-gray-500 text-md">
              +{property.amenities.length - (view === "list" ? 6 : 4)} more
            </span>
          )}

          <AmenityIcon amenity={`${property.bedrooms} Bedrooms`} />
          <AmenityIcon amenity={`${property.bathrooms} Bathrooms`} />
          <AmenityIcon amenity={`${property.area} sqft`} />
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-3 mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/admin/properties/${property._id}`);
            }}
            className="cursor-pointer flex items-center gap-1 px-5 py-1 rounded-lg border border-purple-500 bg-gray-100 text-purple-500 hover:bg-purple-100 transition"
          >
            <SquarePen size={18} strokeWidth={1} />
            Edit
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(property._id);
            }}
            className="cursor-pointer flex items-center gap-1 px-3 py-1 rounded-lg border border-red-500 bg-gray-100 text-red-500 hover:bg-red-100 transition"
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