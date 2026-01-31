"use client";

import AOS from "aos";
import { useEffect } from "react";
import Image from "next/image";

const partners = [
  { id: 1, name: "AA Builders", logoUrl: "/partners/aa-builders.png" },
  { id: 2, name: "Adobe Home", logoUrl: "/partners/adobe-home.png" },
  { id: 3, name: "Ironwood Apartments", logoUrl: "/partners/ironwood-apartments.png", },
  { id: 4, name: "Rosewood Homes", logoUrl: "/partners/rosewood-homes.png", },
  { id: 5, name: "The Capital", logoUrl: "/partners/the-capital.png", },
];

export default function TrustPartners() {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <section className="w-full my-28">
      <div className="max-w-7xl mx-auto px-5 xl:px-0">
        {/* Caption */}
        <div className="mb-14" data-aos="fade-down">
          <h1 className="text-4xl font-lora font-light text-black leading-tight">
            Our Partners <br />
            <span className="text-5xl md:text-6xl font-semibold text-purple-800">
              Trusted by Philz Properties
            </span>
          </h1>
        </div>

        {/* Brick layout */}
        <div className="space-y-8">
          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.slice(0, 3).map((partner, index) => (
              <PartnerCard
                key={partner.id}
                partner={partner}
                delay={index * 100}
              />
            ))}
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:max-w-4xl md:mx-auto">
            {partners.slice(3).map((partner, index) => (
              <PartnerCard
                key={partner.id}
                partner={partner}
                delay={(index + 3) * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Partner Card ---------- */

interface PartnerCardProps {
  partner: { name: string; logoUrl?: string };
  delay?: number;
}

function PartnerCard({ partner, delay = 0 }: PartnerCardProps) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
      className="
        bg-white shadow-md rounded-lg
        h-32 flex items-center justify-center
        text-lg text-gray-700
        transition-transform duration-300 ease-out
        hover:opacity-30
        opacity-100
        overflow-hidden
      "
    >
      {partner.logoUrl ? (
        <Image
          src={partner.logoUrl}
          alt={partner.name}
          width={100}
          height={64}
          className="object-contain max-h-full max-w-full"
        />
      ) : (
        <span>{partner.name}</span>
      )}
    </div>
  );
}