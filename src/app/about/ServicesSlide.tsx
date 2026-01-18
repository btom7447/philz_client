"use client";

import React from "react";

interface Service {
  title: string;
  highlight: string;
  description: string;
}

interface ServicesSlideProps {
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    title: "Building",
    highlight: "Modern. Functional. Enduring.",
    description:
      "We design and construct modern, functional, and high-quality buildings that meet today’s lifestyle demands while maintaining long-term structural integrity. Every project is delivered with precision, sustainability, and future growth in mind.",
  },
  {
    title: "Selling",
    highlight: "Premium & Affordable Properties.",
    description:
      "We provide access to carefully verified premium and affordable properties in strategic locations. Our transparent selling process ensures clients make confident decisions whether buying for living or investment purposes.",
  },
  {
    title: "Management",
    highlight: "Peace of Mind. Sustainable Value.",
    description:
      "Our property management services protect and enhance asset value through professional tenant handling, maintenance oversight, and long-term planning — giving owners complete peace of mind.",
  },
  {
    title: "Investment Advisory",
    highlight: "Smart Decisions. Profitable Outcomes.",
    description:
      "We guide investors through profitable real estate opportunities using market insights, risk assessment, and strategic planning tailored to short- and long-term financial goals.",
  },
  {
    title: "Inspection & Verification",
    highlight: "Transparent. Secure. Trusted.",
    description:
      "We conduct thorough property inspections and verification to ensure authenticity, compliance, and quality — helping clients invest with confidence and zero uncertainty.",
  },
];

export default function ServicesSlide({
  services = defaultServices,
}: ServicesSlideProps) {
  return (
    <section className="relative py-24 bg-gray-50">
      <div className="max-w-[90vw] mx-auto">
        {/* Sticky horizontal scroll wrapper */}
        <div className="relative h-[400px] md:h-[500px]">
          <div
            className="sticky top-[30dvh] flex gap-16 md:gap-24 items-center"
            style={{ width: "max-content" }}
          >
            {services.map((service, index) => (
              <div
                key={service.title}
                className="flex-shrink-0 w-72 md:w-96 p-6 bg-white rounded-xl shadow-lg"
                style={{
                  top: index % 2 === 0 ? "0px" : "40px", // zig-zag effect
                  position: "relative",
                }}
              >
                <h3 className="text-xl md:text-2xl font-lora font-semibold mb-2 text-center">
                  {service.title}
                </h3>
                <h4 className="text-indigo-600 font-lora font-medium mb-2 text-center">
                  {service.highlight}
                </h4>
                <p className="text-gray-700 text-sm md:text-base font-roboto text-center">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
