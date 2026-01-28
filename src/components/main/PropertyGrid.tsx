"use client";

import React from "react";
import PropertyCard from "@/components/main/PropertyCard";
import Pagination from "@/components/admin/properties/Pagination";
import EmptySlate from "@/components/main/EmptySlate";
import { IProperty } from "@/app/types/Properties";

interface PropertyGridProps {
  properties: IProperty[];
  loading: boolean;
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  view: "grid" | "list";
}

const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  loading,
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  view,
}) => {
  const isEmpty = !loading && properties.length === 0;

  // Number of skeleton cards
  const skeletonCount = 6;

  // Skeleton height based on view
  const skeletonHeight = view === "grid" ? "h-140" : "h-65";

  return (
    <>
      <div className="w-full min-h-[50vh] flex justify-center items-start overflow-hidden z-10">
        {loading ? (
          <div
            className={`${
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 gap-5 w-full"
                : "flex flex-col gap-4 w-full"
            }`}
          >
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
            subtitle="Try a different type or search query"
          />
        ) : (
          <div
            className={`${
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch"
                : "flex flex-col gap-4"
            }`}
          >
            {properties.map((property, idx) => (
              <div
                key={property._id}
                data-aos="fade-up"
                data-aos-delay={idx * 100} // staggered fade-up
              >
                <PropertyCard property={property} view={view} />
              </div>
            ))}
          </div>
        )}
      </div>

      {properties.length > 0 && !loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / pageSize)}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

export default React.memo(PropertyGrid);