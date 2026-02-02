"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useProperties } from "@/app/admin/hooks/useAdminData";
import { IProperty } from "@/app/types/Properties";
import AmenityIcon from "@/components/main/AmenityIcon";
import { optimizeCloudinary } from "@/app/utils/optimizeCloudinary";

const DashboardProperties = () => {
  const router = useRouter();
  const { data: properties, isLoading } = useProperties();

  // 4 most recent properties
  const recentProperties: IProperty[] = useMemo(() => {
    if (!properties) return [];
    return [...properties]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 4);
  }, [properties]);

  // Skeletons
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-44 bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* Property cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white shadow-sm overflow-hidden animate-pulse"
            >
              {/* Image */}
              <div className="h-60 bg-gray-200" />

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Title */}
                <div className="h-5 w-3/4 bg-gray-200 rounded" />

                {/* Price */}
                <div className="h-6 w-32 bg-gray-200 rounded" />

                {/* Amenities */}
                <div className="flex flex-wrap gap-2">
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>

                {/* Beds / Baths */}
                <div className="flex gap-3">
                  <div className="h-4 w-14 bg-gray-200 rounded" />
                  <div className="h-4 w-14 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white rounded-2xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <h2 className="text-xl font-semibold">Properties Board</h2>
          <span className="bg-purple-200 text-purple-700 px-5 py-1 text-md rounded-xl">
            Newly Added
          </span>
        </div>
        <button
          onClick={() => router.push("/admin/properties")}
          className="px-4 py-2 rounded-xl border border-purple-600 text-purple-700 hover:bg-purple-700 hover:text-white transition"
        >
          View All Properties
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {recentProperties.map((property) => {
          const hasImage = property.images && property.images.length > 0;

          return (
            <div
              key={property._id}
              onClick={() => router.push("/admin/properties")}
              className="bg-white rounded-xl border border-gray-300 transition cursor-pointer overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-60">
                <img
                  src={
                    hasImage
                      ? optimizeCloudinary(property.images![0].url, 600)
                      : "/placeholder-property.jpg"
                  }
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />

                {/* Status & tags */}
                <div className="absolute top-2 right-2 flex gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{
                      backgroundColor:
                        property.status === "for sale" ? "#16a34a" : "#3b82f6",
                    }}
                  >
                    {property.status}
                  </span>
                  {property.featured && (
                    <span className="px-3 py-1 rounded-full bg-purple-700 text-white text-xs">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-lg truncate">
                  {property.title}
                </h3>

                <p className="text-purple-700 font-semibold text-xl">
                  ₦{property.price.toLocaleString()}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                  {property.amenities.slice(0, 4).map((a) => (
                    <AmenityIcon key={a} amenity={a} />
                  ))}
                  {property.amenities.length > 4 && (
                    <span className="text-gray-500">
                      +{property.amenities.length - 4} more
                    </span>
                  )}
                  <AmenityIcon amenity={`${property.bedrooms} Beds`} />
                  <AmenityIcon amenity={`${property.bathrooms} Baths`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};;

export default DashboardProperties;