"use client";

import { Play } from "lucide-react";

interface VideoPreviewProps {
  onPlay: () => void;
}

export default function VideoPreview({ onPlay }: VideoPreviewProps) {
  return (
    <div
      onClick={onPlay}
      className="relative w-full h-60 lg:h-105 bg-black rounded-lg overflow-hidden
      cursor-pointer group"
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="p-5  rounded-lg bg-white/90 flex items-center justify-center
          group-hover:scale-120 transition"
        >
          <Play size={40} strokeWidth={1} />
        </div>
      </div>
    </div>
  );
}