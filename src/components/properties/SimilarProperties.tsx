"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { IProperty } from "@/app/types/Properties";
import PropertyCard from "../main/PropertyCard";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

interface Props {
  property: IProperty;
}

export default function SimilarProperties({ property }: Props) {
  const [similarProperties, setSimilarProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarProperties = async () => {
      try {
        const res = await fetch("/api/properties");
        const json = await res.json();

        const data: IProperty[] = json.properties; // ✅ Use the correct array
        const filtered = data.filter((p) => p._id !== property._id);
        const selected: IProperty[] = [];
        const addMax = 2;

        // 1️⃣ By location
        const byLocation = filtered.filter(
          (p) => p.address.city === property.address.city,
        );
        selected.push(...byLocation.slice(0, addMax));

        // 2️⃣ By type
        const remainingType = filtered.filter(
          (p) =>
            p.propertyType === property.propertyType &&
            !selected.find((s) => s._id === p._id),
        );
        selected.push(...remainingType.slice(0, addMax));

        // 3️⃣ By status
        const remainingStatus = filtered.filter(
          (p) =>
            p.status === property.status &&
            !selected.find((s) => s._id === p._id),
        );
        selected.push(...remainingStatus.slice(0, addMax));

        // 4️⃣ Fallback
        const remainingFallback = filtered.filter(
          (p) => !selected.find((s) => s._id === p._id),
        );
        selected.push(...remainingFallback.slice(0, 10 - selected.length));

        setSimilarProperties(selected.slice(0, 10));
      } catch (err) {
        console.error("Failed to fetch similar properties", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProperties();
  }, [property]);

  const sliderSettings = {
    dots: true,
    infinite: similarProperties.length > 4,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
    customPaging: (i: number) => (
      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
    ),
  };
  
  const skeletonHeight = "h-140";

  return (
    <section className="w-full">
      {loading ? (
        <div className="max-w-7xl mx-auto py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx} className="px-2">
                <div
                  className={`animate-pulse bg-gray-200 rounded-lg min-w-100 ${skeletonHeight}`}
                />
              </div>
            ) )}
          </div>
        </div>
      ) : similarProperties.length > 0 ? (
        <div>
          <div className="border-l-2 border-purple-700 px-5 py-2 mt-10 mb-5">
            <h2 className="text-3xl font-semibold">Similar Properties</h2>
          </div>
          <Slider {...sliderSettings}>
            {similarProperties.map((p) => (
              <div key={p._id} className="px-2 pb-10">
                <PropertyCard property={p} />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p className="text-gray-500">No similar properties found.</p>
      )}
    </section>
  );
}