"use client";

import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";

import { ITestimonial } from "@/app/types/Testimonial";
import EmptySlate from "./EmptySlate";

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const imageSliderRef = useRef<Slider | null>(null);
  const textSliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });

    const fetchTestimonials = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/testimonials/public`,
          {
            cache: "no-store",
          },
        );

        if (!res.ok) throw new Error("Failed to fetch testimonials");

        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <ClipLoader size={40} color="#6b21a8" />
      </div>
    );
  }

  if (error || !testimonials.length) {
    return (
      <div className="py-24">
        <EmptySlate
          title="No Results"
          subtitle="No testimonials are available at the moment."
        />
      </div>
    );
  }

  const imageSettings = {
    arrows: false,
    dots: false,
    infinite: true,
    fade: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: textSliderRef.current as any,
  };

  const textSettings = {
    arrows: false,
    dots: false,
    infinite: true,
    fade: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: imageSliderRef.current as any,
  };

  return (
    <section className="w-full py-20 px-5 xl:px-0 relative">
      {/* Header */}
      <div className="space-y-4 text-center relative z-20">
        <h1
          data-aos="fade-down"
          className="text-4xl font-lora font-light text-black leading-tight"
        >
          Feedback
        </h1>
        <span
          data-aos="fade-up"
          data-aos-delay="200"
          className="block text-5xl md:text-6xl font-semibold text-purple-800"
        >
          Testimonials
        </span>
      </div>

      {/* Carousels container */}
      <div className="relative max-w-7xl mx-auto mt-10 h-120 lg:h-130">
        {/* IMAGE CAROUSEL (behind, top-right) */}
        <div
          className="absolute top-0 md:right-0 w-full lg:w-3/5 h-70 lg:h-100 rounded-xl overflow-hidden z-10"
          data-aos="fade-right"
        >
          <Slider {...imageSettings} ref={imageSliderRef}>
            {testimonials.map((t) => (
              <div key={t._id} className="h-full">
                <img
                  src={t.images[0]?.url}
                  alt={t.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* TEXT CAROUSEL (bottom-left, on top) */}
        <div
          className="absolute bottom-0 left-0 w-full md:w-2/3 z-20"
          data-aos="fade-left"
        >
          <h1
            data-aos="fade-left"
            className="hidden lg:block text-4xl font-lora font-light text-black leading-tight mb-10 testimonial-heading"
          >
            What People Say
          </h1>

          <div className="bg-white rounded-xl shadow-xl p-5 md:p-10 relative">
            <Slider
              {...textSettings}
              ref={textSliderRef}
              className="relative z-10"
            >
              {testimonials.map((t) => (
                <div key={t._id}>
                  <h3 className="text-2xl leading-relaxed font-semibold text-gray-900">
                    {t.name}
                  </h3>
                  <p className="text-lg text-gray-500 mb-5">{t.title}</p>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    {t.content}
                  </p>
                  <div className="mt-4 flex gap-1 text-3xl text-yellow-500">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* Navigation buttons below everything */}
      <div className="max-w-7xl mx-auto flex justify-end gap-4 z-30 relative">
        <button
          onClick={() => {
            imageSliderRef.current?.slickPrev();
            textSliderRef.current?.slickPrev();
          }}
          className="p-3 rounded-full  bg-transparent text-gray-700
                     hover:border-purple-700 hover:bg-purple-700 hover:text-white cursor-pointer hover:scale-105 transition"
        >
          <ChevronLeft className="w-8 h-8" strokeWidth={1.5} />
        </button>

        <button
          onClick={() => {
            imageSliderRef.current?.slickNext();
            textSliderRef.current?.slickNext();
          }}
          className="p-3 rounded-full  bg-transparent text-gray-700
                     hover:border-purple-700 hover:bg-purple-700 hover:text-white cursor-pointer hover:scale-105 transition"
        >
          <ChevronRight className="w-8 h-8" strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}