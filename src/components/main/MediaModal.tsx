"use client";

import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import Modal from "react-modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MediaFile } from "@/app/types/Properties";
import { optimizeCloudinary } from "@/app/utils/optimizeCloudinary";
import { X, Play, Pause, ZoomIn, ZoomOut } from "lucide-react";

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  images?: MediaFile[];
  videos?: MediaFile[];
  type: "images" | "videos";
}

const MediaModal: React.FC<MediaModalProps> = ({
  isOpen,
  onClose,
  images = [],
  videos = [],
  type,
}) => {
  const media = type === "images" ? images : videos;
  const sliderRef = useRef<Slider>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: isPlaying,
    autoplaySpeed: 3000,
    afterChange: (index: number) => {
      setCurrentIndex(index);
      setIsZoomed(false);
    },
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!sliderRef.current) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") sliderRef.current.slickNext();
      if (e.key === "ArrowLeft") sliderRef.current.slickPrev();
      if (e.key === " ") setIsPlaying((prev) => !prev);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const toggleSlideshow = () => setIsPlaying((prev) => !prev);
  const toggleZoom = () => setIsZoomed((prev) => !prev);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      shouldCloseOnOverlayClick
      parentSelector={() => document.body}
      overlayClassName="fixed inset-0 z-[9999] bg-black/90"
      className="fixed inset-0 outline-none flex flex-col items-center justify-start pt-4"
    >
      {/* Top Overlay */}
      <div className="w-full max-w-6xl flex items-center justify-between text-white px-4 z-50 mb-4">
        <span className="text-md">
          {currentIndex + 1} / {media.length}
        </span>
        <div className="flex items-center gap-6">
          {type === "images" && (
            <button
              onClick={toggleZoom}
              className="hover:opacity-80 cursor-pointer"
              title={isZoomed ? "Zoom Out" : "Zoom In"}
            >
              {isZoomed ? (
                <ZoomOut size={20} strokeWidth={1} />
              ) : (
                <ZoomIn size={20} strokeWidth={1} />
              )}
            </button>
          )}
          <button
            onClick={toggleSlideshow}
            className="hover:opacity-80 cursor-pointer"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={20} strokeWidth={1} />
            ) : (
              <Play size={20} strokeWidth={1} />
            )}
          </button>
          <button
            onClick={onClose}
            className="hover:opacity-80 cursor-pointer"
            title="Close"
          >
            <X size={22} strokeWidth={1} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="w-full max-w-6xl flex-1 flex items-center justify-center">
        {!media.length ? (
          <p className="text-white text-center">No media available</p>
        ) : (
          <Slider ref={sliderRef} {...settings} className="w-full">
            {media.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-[80vh] p-2"
              >
                {type === "images" ? (
                  <div
                    className={`relative w-full h-[80vh] transition-transform duration-300 ${
                      isZoomed && currentIndex === i ? "scale-150" : "scale-100"
                    }`}
                  >
                    <img
                      src={optimizeCloudinary(item.url, 1600)}
                      alt={`Media ${i + 1}`}
                      className="object-contain w-full h-full"
                    />
                  </div>
                ) : (
                  <video
                    src={optimizeCloudinary(item.url, undefined, "video")}
                    controls
                    preload="metadata"
                    className="max-h-[80dvh] w-full object-contain"
                  />
                )}
              </div>
            ))}
          </Slider>
        )}
      </div>
    </Modal>
  );
};

export default MediaModal;