"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/main/LeafletMap"), {
  ssr: false,
});

interface MapWrapperProps {
  pins: { label: string; lat: number; lng: number }[];
  height?: string | number;
}

export default function MapWrapper({ pins, height }: MapWrapperProps) {
  return <LeafletMap pins={pins} height={height} />;
}