"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IProperty } from "@/app/types/Properties";
import { optimizeCloudinary } from "@/app/utils/optimizeCloudinary";
import AmenityIcon from "../main/AmenityIcon";
import Link from "next/link";

export default function FeaturedPropertiesSection() {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/properties");
        const json = await res.json();

        const data: IProperty[] = Array.isArray(json.properties)
          ? json.properties
          : [];

        setProperties(data.filter((p) => p.featured));
      } catch (err) {
        console.error("Error fetching featured properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: properties.length > 1,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: false,
    customPaging: (i: number) => (
      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
    ),
    dotsClass: "slick-dots",
  };

  return (
    <section className="relative w-full my-28" data-aos="fade-up">
      <div className="relative max-w-7xl mx-auto px-5 xl:px-0">
        <div className="flex flex-col lg:flex-row gap-14 items-start">
          {/* Caption */}
          <div
            className="
                relative w-full lg:w-1/2 lg:mt-35
                before:hidden lg:before:block
                before:content-['']
                before:absolute
                before:inset-x-[-150dvw]
                before:left-1/2
                before:-translate-x-1/2
                before:top-1/2
                before:-translate-y-1/2
                before:h-70
                before:bg-purple-100
                before:-z-10
              "
          >
            <h1
              data-aos="fade-right"
              className="text-4xl font-lora font-light text-black leading-tight"
            >
              Check out <br />
              <span className="text-5xl md:text-6xl font-semibold text-purple-800">
                Featured Properties
              </span>
            </h1>
          </div>

          {/* Carousel */}
          <div className="w-full lg:w-1/2">
            {loading ? (
                // SKELETON LOADER
              <div className="px-2 animate-pulse">
                <div className="h-80 lg:h-100 w-full rounded-lg bg-gray-200" />
                {/* Dots spacing */}
                <div className="pt-3" />

                {/* Content skeleton */}
                <div className="px-5 pb-6 space-y-4">
                  {/* Title */}
                  <div className="h-6 w-3/4 rounded bg-gray-200" />

                  {/* Description lines */}
                  <div className="space-y-2">
                    <div className="h-4 w-full rounded bg-gray-200" />
                    <div className="h-4 w-11/12 rounded bg-gray-200" />
                    <div className="h-4 w-9/12 rounded bg-gray-200" />
                  </div>

                  {/* Amenities */}
                  <div className="flex gap-3 flex-wrap">
                    <div className="h-4 w-20 rounded bg-gray-200" />
                    <div className="h-4 w-24 rounded bg-gray-200" />
                    <div className="h-4 w-16 rounded bg-gray-200" />
                  </div>

                  {/* Price */}
                  <div className="h-6 w-32 rounded bg-gray-200 pt-2" />
                </div>
              </div>
            ) : (
              <Slider {...sliderSettings}>
                {properties.map((property) => {
                  const imageUrl = property.images?.[0]?.url;

                  return (
                    <Link href={`/properties/${property._id}`} key={property._id} className="px-2">
                      <div className="">
                        {/* Image */}
                        <div className="relative h-80 lg:h-100 w-full rounded-lg overflow-hidden">
                          {imageUrl ? (
                            <img
                              src={optimizeCloudinary(imageUrl, 900)}
                              alt={property.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-gray-400">
                              No Image
                            </div>
                          )}
                        </div>

                        {/* Dots live here */}
                        <div className="pt-3" />

                        {/* Content */}
                        <div className="pb-6 space-y-3">
                          <h3 className="text-2xl font-semibold truncate">
                            {property.title}
                          </h3>

                          <p className="text-gray-600 text-md line-clamp-2">
                            {property.description}
                          </p>

                          {/* Amenities */}
                          <div className="flex flex-wrap gap-3 text-gray-500 text-sm">
                            <AmenityIcon amenity={`${property.area} sqft`} />
                            <AmenityIcon
                              amenity={`${property.toilets} Toilets`}
                            />

                            {["house", "apartment"].includes(
                              property.propertyType,
                            ) && (
                              <AmenityIcon
                                amenity={`${property.bedrooms} Bedrooms`}
                              />
                            )}

                            {property.amenities?.slice(0, 2).map((a) => (
                              <AmenityIcon key={a} amenity={a} />
                            ))}
                          </div>

                          {/* Price */}
                          <p className="pt-2 text-3xl font-bold text-purple-700">
                            ₦{property.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}