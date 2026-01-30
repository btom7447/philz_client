"use client";

import { useState } from "react";
import { IProperty } from "@/app/types/Properties";
import VideoPreview from "./VideoPreview";
import VideoModal from "./VideoModal";

interface Props {
  property: IProperty;
}

export default function PropertyVideos({ property }: Props) {
  const videos = property?.videos;
  const [open, setOpen] = useState(false);

  if (!videos || videos.length === 0) return null;

  return (
    <section className="w-full px-5 xl:px-0">
      <div className="max-w-7xl mx-auto">
        <div className="border-l-2 border-purple-700 px-5 py-2 mt-10 mb-5">
          <h2 className="text-3xl font-semibold">Property Videos</h2>
        </div>

        <VideoPreview onPlay={() => setOpen(true)} />

        <VideoModal
          videos={videos}
          isOpen={open}
          onClose={() => setOpen(false)}
        />
      </div>
    </section>
  );
}
