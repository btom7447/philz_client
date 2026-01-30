"use client";

import { useRef, useEffect } from "react";
import Slider, { type Settings } from "react-slick";
import { X } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MediaFile } from "@/app/types/Properties";

interface VideoModalProps {
  videos: MediaFile[];
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({
  videos,
  isOpen,
  onClose,
}: VideoModalProps) {
  const sliderRef = useRef<Slider | null>(null);

  // 🔹 Pause all videos
  const pauseAllVideos = () => {
    document
      .querySelectorAll("video")
      .forEach((v) => (v as HTMLVideoElement).pause());
  };

  // 🔹 ESC key support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        pauseAllVideos();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // 🔹 Pause videos when modal closes
  useEffect(() => {
    if (!isOpen) pauseAllVideos();
  }, [isOpen]);

  if (!isOpen) return null;

  const settings: Settings = {
    dots: true,
    arrows: true,
    infinite: videos.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: pauseAllVideos,
  };

  return (
    <div
      className="fixed inset-0 z-40 bg-white/30 backdrop-blur-sm flex items-center justify-center"
      onClick={() => {
        pauseAllVideos();
        onClose();
      }}
    >
      {/* Modal content (prevent backdrop close) */}
      <div
        className="relative w-full max-w-5xl px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => {
            pauseAllVideos();
            onClose();
          }}
          className="absolute -top-10 right-4 text-white hover:opacity-70"
        >
          <X size={28} />
        </button>

        <Slider ref={sliderRef} {...settings}>
          {videos.map((video, index) => (
            <div
              key={video.public_id ?? index}
              className="px-2 flex justify-center"
            >
              <video
                controls
                autoPlay
                className="w-full max-h-[80vh] rounded-lg bg-black object-contain"
              >
                <source src={video.url} type="video/mp4" />
              </video>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}