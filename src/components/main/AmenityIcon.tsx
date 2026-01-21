"use client";

import React, { FC } from "react";
import {
  Bed,
  Bath,
  Ruler,
  Star,
  Car,
  Dumbbell,
  Toilet,
  Trees,
  Shield,
  WavesLadder,
  CarFront,
  ParkingSquare,
} from "lucide-react";

interface Props {
  amenity: string;
}

const iconMap: Record<string, React.ReactNode> = {
  bed: <Bed size={25} strokeWidth={1} />,
  bedrooms: <Bed size={25} strokeWidth={1} />,
  bath: <Bath size={25} strokeWidth={1} />,
  bathrooms: <Bath size={25} strokeWidth={1} />,
  toilet: <Toilet size={25} strokeWidth={1} />,
  garage: <CarFront size={25} strokeWidth={1} />,
  parking: <ParkingSquare size={25} strokeWidth={1} />,
  gym: <Dumbbell size={25} strokeWidth={1} />,
  pool: <WavesLadder size={25} strokeWidth={1} />,
  garden: <Trees size={25} strokeWidth={1} />,
  security: <Shield size={25} strokeWidth={1} />,
};

const AmenityIcon: FC<Props> = ({ amenity }) => {
  const key = amenity.toLowerCase();
  const icon = iconMap[key];
  if (!icon) return null;

  return (
    <div
      className="flex items-center mr-3 gap-1 text-purple-800 rounded hover:text-purple-700"
      title={amenity} // hover tooltip
    >
      {icon}
      <span className="text-lg text-gray-700 font-extralight ">{amenity}</span>
    </div>
  );
};

export default AmenityIcon;