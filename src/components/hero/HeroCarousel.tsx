"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "./hero-carousel.css"; // we'll create this for custom bullets

const dummyImages = [
  "/hero/hero_image_one.jpg",
  "/hero/hero_image_two.jpg",
  "/hero/hero_image_three.jpg",
];

export default function HeroCarousel() {
  return (
    <div
      className="relative w-full h-110 md:h-140 rounded-2xl overflow-hidden z-30"
      data-aos="fade-left"
    >
      <Splide
        options={{
          type: "fade",
          perPage: 1,
          autoplay: true,
          interval: 5000,
          pauseOnHover: true,
          arrows: false,
          pagination: true,
        }}
        className="h-full"
      >
        {dummyImages.map((src, idx) => (
          <SplideSlide key={idx}>
            <div className="w-full h-100 md:h-130 rounded-3xl overflow-hidden">
              <img
                src={src}
                alt={`Property ${idx + 1}`}
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
