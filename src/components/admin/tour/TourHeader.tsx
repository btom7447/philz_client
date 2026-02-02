"use client";

import { FC, useState } from "react";
import { Filter } from "lucide-react";
import SearchInput from "../properties/SearchInput";
import SelectFilter from "../properties/SelectFilter";
import ViewToggle from "../properties/ViewToggle";

import { TOUR_TYPES } from "@/app/types/Tour";

interface Props {
  view: "grid" | "list";
  setView: (v: "grid" | "list") => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  tourType: "all" | "in-person" | "virtual";
  setTourType: (v: "all" | "in-person" | "virtual") => void;
}

const TourHeader: FC<Props> = ({
  view,
  setView,
  searchQuery,
  setSearchQuery,
  tourType,
  setTourType,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="p-5 bg-white border-b border-gray-300 flex flex-col gap-3">
      {/* ---------------- MOBILE HEADER ---------------- */}
      <div className="flex justify-between items-center 2xl:hidden">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex items-center gap-2 bg-purple-700 text-white font-roboto text-xl px-8 py-3 rounded-lg hover:bg-purple-800 transition cursor-pointer"
        >
          <Filter className="w-5 h-5" strokeWidth={1} />
          Filters
        </button>
      </div>

      {/* Mobile accordion */}
      <div
        className={`overflow-hidden transition-all duration-300 2xl:hidden`}
        style={{
          maxHeight: mobileOpen ? "1000px" : "0px",
        }}
      >
        <div className="flex flex-col gap-3 pt-4 border-t border-gray-300 mt-2">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
          <SelectFilter
            value={tourType}
            onChange={(v) => setTourType(v as any)}
            placeholder="Tour Type"
            options={[{ value: "all", label: "All Types" }, ...TOUR_TYPES]}
          />
        </div>
      </div>

      {/* ---------------- DESKTOP HEADER ---------------- */}
      <div className="hidden 2xl:flex justify-between items-center">
        {/* Left: filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-50">
            <SearchInput value={searchQuery} onChange={setSearchQuery} />
          </div>
          <SelectFilter
            value={tourType}
            onChange={(v) => setTourType(v as any)}
            placeholder="Tour Type"
            options={[{ value: "all", label: "All Types" }, ...TOUR_TYPES]}
          />
        </div>

        {/* Right: view toggle */}
        <ViewToggle view={view} setView={setView} />
      </div>
    </div>
  );
};

export default TourHeader;