"use client";

import { FC } from "react";
import { MapPin, MapPinHouse, Monitor } from "lucide-react";

interface Props {
  tourType: "virtual" | "in-person";
  setTourType: (type: "virtual" | "in-person") => void;
}

const TourTypeToggle: FC<Props> = ({ tourType, setTourType }) => {
  return (
    <div className="w-fit flex bg-gray-300 rounded-lg p-1">
      <button
        type="button" // <-- prevent accidental submit
        onClick={() => setTourType("in-person")}
        className={`flex items-center gap-2 py-3 px-6 rounded-lg transition-all duration-200 ${
          tourType === "in-person"
            ? "bg-white shadow text-purple-700"
            : "text-gray-800"
        }`}
      >
        <MapPinHouse size={18} strokeWidth={1} />
        In Person
      </button>

      <button
        type="button" // <-- prevent accidental submit
        onClick={() => setTourType("virtual")}
        className={`flex items-center gap-2 py-3 px-6 rounded-lg transition-all duration-200 ${
          tourType === "virtual"
            ? "bg-white shadow text-purple-700"
            : "text-gray-800"
        }`}
      >
        <Monitor size={18} strokeWidth={1} />
        Virtual
      </button>
    </div>
  );
};

export default TourTypeToggle;