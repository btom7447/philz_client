"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const dummyImages = [
  "/hero/hero_image_one.jpg",
  "/hero/hero_image_two.jpg",
  "/hero/hero_image_three.jpg",
];

export default function HeroCarousel() {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 700,
    fade: true,
    pauseOnHover: true,
    arrows: false,
    dots: true,
    customPaging: (i: number) => (
      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
    ),
    dotsClass: "slick-dots", 
  };

  return (
    <div
      className="relative w-full pb-10 rounded-2xl overflow-hidden z-30"
      data-aos="fade-left"
    >
      <Slider {...settings} className="h-full">
        {dummyImages.map((src, idx) => (
          <div key={idx} className="w-full h-100 md:h-130 px-1">
            <div className="w-full h-full rounded-3xl overflow-hidden">
              <img
                src={src}
                alt={`Property ${idx + 1}`}
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}