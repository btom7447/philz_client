"use client";

import { IProperty } from "@/app/types/Properties";
import { ArrowLeftRight, Heart, MapPin, Share, Share2 } from "lucide-react";
import PropertyAmenityIcon from "./PropertyAmenityIcon";

interface Props {
  property: IProperty;
}

export default function PropertyMajorDetails({ property }: Props) {
  const amenities = property.amenities ?? [];

  return (
    <section className="flex flex-col xl:col-span-2">
      {/* Title & Action buttons favorite, compare, share */}
      <div className="flex items-center justify-between gap-5 border-l-2 border-purple-700 py-2 px-5 mb-5">
        <h1 className="text-3xl font-semibold">{property.title}</h1>
        <div className="flex items-center gap-5">
          <Heart size={20} strokeWidth={1} />
          <ArrowLeftRight size={20} strokeWidth={1} />
          <Share size={20} strokeWidth={1} />
        </div>
      </div>

      <div className="w-full flex items-center justify-between gap-5">
        <div className="flex items-start gap-2 mb-5">
          <MapPin
            size={25}
            strokeWidth={1}
            className="text-purple-700 mt-0.5"
          />
          <div className="text-md lg:text-lg text-gray-700 leading-tight">
            <p>
              {property.address.city}, {property.address.state}
            </p>
            <p>
              {new Date(property.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <p className="text-2xl lg:text-4xl text-purple-700 font-bold mb-10">
        ₦{property.price.toLocaleString()}
      </p>

      <div className="w-full flex items-center flex-wrap justify-between">
        <div className="flex items-center gap-5">
          {/* Featured */}
          {property.featured && (
            <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-purple-600 text-white text-sm">
              Featured
            </span>
          )}

          {/* Status */}
          <span
            className={`flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium ${
              property.status === "for sale"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {property.status === "for sale" ? "For Sale" : "For Rent"}
          </span>
        </div>

        <p className="capitalize">year built: {property.yearBuilt}</p>
      </div>

      <div className="w-full mt-5">
        <div className="border-l-2 border-purple-700 px-5 py-2 mt-10 mb-5">
          <h2 className="text-3xl font-semibold">Description</h2>
        </div>
        <p className="text-lg lg:text-xl text-gray-500 leading-relaxed">
          {property.description}
        </p>
      </div>

      <div className="mt-5">
        <div className="border-l-2 border-purple-700 px-5 py-2 mt-10 mb-5">
          <h2 className="text-3xl font-semibold">Amenities</h2>
        </div>

        <div className="mt-5 max-w-2xl text-gray-500 text-lg">
          <div className="grid grid-cols-2 gap-x-5 gap-y-10">
            <PropertyAmenityIcon amenity={`${property.area} sqft`} size={25} />
            <PropertyAmenityIcon
              amenity={`${property.toilets} Toilets`}
              size={25}
            />

            {["house", "apartment"].includes(property.propertyType) && (
              <PropertyAmenityIcon
                amenity={`${property.bedrooms} Bedrooms`}
                size={25}
              />
            )}

            {["office", "shop"].includes(property.propertyType) && (
              <PropertyAmenityIcon amenity={`Parking`} size={25} />
            )}

            {/* Extra amenities */}
            {amenities.map((amenity) => (
              <PropertyAmenityIcon key={amenity} amenity={amenity} size={25} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="border-l-2 border-purple-700 px-5 py-2 mt-10 mb-5">
          <h2 className="text-3xl font-semibold">Additional Details</h2>
        </div>

        <p className="text-lg lg:text-xl text-gray-500 leading-relaxed">
          {property.additionalDetails}
        </p>
      </div>
    </section>
  );
}
