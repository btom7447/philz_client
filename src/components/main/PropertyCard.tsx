"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IProperty } from "@/app/types/Properties";
import { Heart, Copy, Image as ImageIcon, Video, Map, MapPin, Star, ArrowLeftRight } from "lucide-react";
import MediaModal from "./MediaModal";
import Modal from "react-modal";
import { optimizeCloudinary } from "@/app/utils/optimizeCloudinary";
import AmenityIcon from "./AmenityIcon";

interface PropertyCardProps {
  property: IProperty;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [isCompare, setIsCompare] = useState(false);
  const [modalType, setModalType] = useState<"images" | "videos" | null>(null);
  const isResidential = ["house", "apartment"].includes(property.propertyType);
  const isCommercial = ["office", "shop"].includes(property.propertyType);

  const amenities = property.amenities ?? [];

  // Set modal app element ONCE
  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement("body");
    }
  }, []);

  useEffect(() => {
    const favs: string[] = JSON.parse(
      localStorage.getItem("favourites") || "[]",
    );
    const compare: string[] = JSON.parse(
      localStorage.getItem("compare") || "[]",
    );
    setIsFavourite(favs.includes(property._id));
    setIsCompare(compare.includes(property._id));
  }, [property._id]);

  const toggleLocalStorage = (key: string, value: boolean) => {
    const arr: string[] = JSON.parse(localStorage.getItem(key) || "[]");
    if (value) arr.push(property._id);
    else arr.splice(arr.indexOf(property._id), 1);
    localStorage.setItem(key, JSON.stringify(arr));
  };

  return (
    <div className="relative h-full flex flex-col rounded-lg overflow-hidden bg-white shadow-lg transition">
      {/* Image */}
      <div className="relative h-70 w-full bg-gray-100 overflow-hidden rounded-t-lg group shrink-0">
        {property.images?.[0]?.url ? (
          <Image
            src={optimizeCloudinary(property.images[0].url, 600)}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
            priority={property.featured}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            No Image
          </div>
        )}

        {/* Tags */}
        <div className="absolute top-3 right-3 z-20 flex items-end gap-2">
          {/* Featured */}
          {property.featured && (
            <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-purple-600 text-white text-sm shadow-md">
              Featured
            </span>
          )}

          {/* Status */}
          <span
            className={`flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium shadow-md ${
              property.status === "for sale"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {property.status === "for sale" ? "For Sale" : "For Rent"}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 pt-4 space-y-2 flex-1">
        <h3 className="text-xl font-semibold">{property.title}</h3>
        <div className="flex items-start gap-2">
          <MapPin
            size={20}
            strokeWidth={1}
            className="text-purple-700 mt-0.5"
          />
          <div className="text-md text-gray-700 leading-tight">
            <p>
              {property.address.city}, {property.address.state}
            </p>
            <p>
              Added:{" "}
              {new Date(property.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-3 text-gray-500 text-sm">
          <AmenityIcon amenity={`${property.area} sqft`} />
          <AmenityIcon amenity={`${property.toilets} Toilets`} />
          {["house", "apartment"].includes(property.propertyType) && (
            <AmenityIcon amenity={`${property.bedrooms} Bedrooms`} />
          )}
          {["office", "shop"].includes(property.propertyType) && (
            <AmenityIcon amenity={`Parking`} />
          )}

          {/* Extra amenities */}
          {amenities.slice(0, 3).map((amenity) => (
            <AmenityIcon key={amenity} amenity={amenity} />
          ))}
        </div>
      </div>

      {/* Agent & Price */}
      <div className="mt-2 px-4 py-2 flex items-center justify-between shrink-0 border-t border-gray-300">
        {/* Agency info */}
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden">
            <Image
              src="/logo_one.png"
              alt="Philz Logo"
              fill
              className="object-cover object-center rounded-full border border-gray-300"
            />
          </div>
          <span className="font-medium text-md text-gray-700">
            Philz Properties
          </span>
        </div>

        {/* Price */}
        <p className="font-bold text-2xl text-purple-700">
          ₦{property.price.toLocaleString()}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-1 flex w-full justify-evenly shrink-0">
        <button
          onClick={() => {
            setIsFavourite((v) => {
              toggleLocalStorage("favourites", !v);
              return !v;
            });
          }}
          className={`flex-1 flex items-center justify-center gap-1 py-3 text-sm shadow-sm cursor-pointer hover:bg-purple-100 ${isFavourite ? "text-purple-700 font-medium" : "text-gray-500"}`}
        >
          <Heart size={18} strokeWidth={`${isFavourite ? 1.5 : 1}`} />
          <span>Favorite</span>
        </button>

        <button
          onClick={() => {
            setIsCompare((v) => {
              toggleLocalStorage("compare", !v);
              return !v;
            });
          }}
          className={`flex-1 flex items-center justify-center gap-1 py-3 text-sm shadow-sm cursor-pointer hover:bg-purple-100 ${isCompare ? "text-purple-700 font-medium" : "text-gray-500"}`}
        >
          <ArrowLeftRight size={18} strokeWidth={`${isCompare ? 1.5 : 1}`} />
          <span>Compare</span>
        </button>

        <button
          onClick={() => setModalType("images")}
          className={`flex-1 flex items-center justify-center gap-1 py-3 text-sm shadow-sm cursor-pointer hover:bg-purple-100 ${modalType === "images" ? "text-purple-700 font-medium" : "text-gray-500"}`}
        >
          <ImageIcon
            size={18}
            strokeWidth={`${modalType === "images" ? 1.5 : 1}`}
          />
          <span>Images</span>
        </button>

        <button
          onClick={() => setModalType("videos")}
          disabled={!property.videos?.length}
          className={`flex-1 flex items-center justify-center gap-1 py-3 text-sm shadow-sm cursor-pointer hover:bg-purple-100 ${modalType === "videos" ? "text-purple-700 font-medium" : "text-gray-500"}`}
        >
          <Video
            size={18}
            strokeWidth={`${modalType === "videos" ? 1.5 : 1}`}
          />
          <span>Videos</span>
        </button>
      </div>

      {/* Modal */}
      {modalType && (
        <MediaModal
          isOpen
          onClose={() => setModalType(null)}
          type={modalType}
          images={property.images}
          videos={property.videos}
        />
      )}
    </div>
  );
};

export default PropertyCard;