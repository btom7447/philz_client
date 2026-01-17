"use client";

import HeroText from "./HeroText";
import HeroCarousel from "./HeroCarousel";

export default function HeroSection() {
  return (
    <section className="relative py-16 grid md:grid-cols-2 gap-10 items-start">
      <HeroText />
      <HeroCarousel />
    </section>
  );
}