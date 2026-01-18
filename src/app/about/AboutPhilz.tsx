"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

interface AboutPhilzProps {
  ceoImage?: string; // path to CEO image
  ceoName?: string;
  ceoSignature?: string; // cursive signature
  title?: string;
}

export default function AboutPhilz({
  ceoImage = "/about/philz_ceo.webp",
  ceoName = "Philip David",
  title = "Chief Executive Officer",
  ceoSignature = "Philip David",
}: AboutPhilzProps) {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  const aboutText = `
Founded in 2021, Philz Properties and Investment is a fast-growing real estate 
and investment company dedicated to transforming Nigeria's property landscape. 
Guided by passion, innovation, and growth, we specialize in developing, selling, 
and managing properties that cater to first-time buyers, investors, and the general public.

Our reputation is built on a foundation of partnership, integrity, and excellence (PIE), 
ensuring that every project we deliver reflects our commitment to quality. 
With a client-focused approach, we provide real estate services that stand out 
for their exceptional standards, innovative solutions, and transparent processes.

At Philz Properties, we are not just building houses—we are creating lasting value, 
sustainable communities, and trusted investment opportunities.
`;

  const aboutSubtext = `Experience transparency, excellence, and innovation in real estate with Philz Properties. 
Our client-centered approach ensures that every interaction adds value and confidence to your property journey.`;

  return (
    <article className="px-5 xl:px-0 pb-20 relative">
      {/* Article Text */}
      <h2
        data-aos="fade-down"
        className="text-4xl font-lora font-light text-black mb-5"
      >
        About Philz Properties
      </h2>
      <div className="prose lg:prose-lg max-w-none">
        {/* CEO Image floating top-left */}
        <div
          data-aos="fade-right"
          className="w-full xl:w-80 h-120 xl:h-80 float-left rounded-lg overflow-hidden shadow-lg mt-0 xl:mt-10 mr-0 xl:mr-5 mb-5"
        >
          <Image
            src={ceoImage}
            alt={ceoName}
            fill
            className="object-cover object-top rounded-lg"
            priority
          />
        </div>

        <p
          data-aos="fade-up"
          className="text-xl text-gray-700 font-roboto leading-relaxed whitespace-pre-line mb-5"
        >
          {aboutText}
        </p>

        <p
          data-aos="fade-up"
          data-aos-delay={100}
          className="text-xl text-gray-700 font-roboto leading-relaxed whitespace-pre-line mb-4"
        >
          {aboutSubtext}
        </p>

        {/* CEO Signature */}
        <div data-aos="fade-left" className="mt-8">
          <span className="block text-purple-700 text-4xl xl:7xl signature">
            {ceoSignature}
          </span>
          <span className="block text-lg font-light text-gray-700">
            {title}
          </span>
        </div>
      </div>

      {/* Clear float */}
      <div className="clear-both" />
    </article>
  );
}