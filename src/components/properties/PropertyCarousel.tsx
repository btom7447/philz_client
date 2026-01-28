"use client";

import Slider from "react-slick";
import Image from "next/image";
import { IProperty } from "@/app/types/Properties";
import { optimizeCloudinary } from "@/app/utils/optimizeCloudinary";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EmptySlate from "../main/EmptySlate";

interface Props {
  property: IProperty;
}

export default function PropertyCarousel({ property }: Props) {
  const settings = {
    centerMode: true,
    centerPadding: "20%", 
    slidesToShow: 1,
    infinite: true,
    autoplay: false,
    arrows: false,
    dots: true,
    customPaging: (i: number) => (
      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
    ),
  };

  if (!property.images || property.images.length === 0) {
    return (
        <EmptySlate
          title="Property Images"
          subtitle="No Images available"
        />
    );
  }

  return (
    <section className="w-full">
      <Slider {...settings}>
        {property.images.map((img) => (
          <div key={img.public_id} className="px-3 pb-5 ">
            <div className="relative w-full h-70 lg:h-100 xl:h-150 shadow-lg rounded-lg">
              <Image
                src={optimizeCloudinary(img.url, 800)}
                alt={property.title}
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 1024px) 100dvw, 800px"
              />
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}