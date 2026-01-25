"use client";

import { FC, useState } from "react";
import { IProperty } from "./PropertiesList";
import { Filter } from "lucide-react";
import SearchInput from "./SearchInput";
import SelectFilter from "./SelectFilter";
import ViewToggle from "./ViewToggle";
import AddPropertyButton from "./AddPropertyButton";

interface Props {
  view: "grid" | "list";
  setView: (v: "grid" | "list") => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  propertyType: IProperty["propertyType"] | "all";
  setPropertyType: (v: IProperty["propertyType"] | "all") => void;
  status: IProperty["status"] | "all";
  setStatus: (v: IProperty["status"] | "all") => void;
  addNew: boolean;
}

const PropertiesHeader: FC<Props> = ({
  view,
  setView,
  searchQuery,
  setSearchQuery,
  propertyType,
  setPropertyType,
  status,
  setStatus,
  addNew, 
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
          <Filter className="w-5 h-5" />
          Filters
        </button>

        <div className={`${!addNew ? "hidden" : "block"}`}>
          <AddPropertyButton />
        </div>
      </div>

      {/* Mobile accordion */}
      <div
        className={`overflow-hidden transition-all duration-300 2xl:hidden`}
        style={{
          maxHeight: mobileOpen ? "1000px" : "0px", // adjust 1000px if more content
        }}
      >
        <div className="flex flex-col gap-3 pt-4 border-t border-gray-300 mt-2">
          <ViewToggle view={view} setView={setView} />
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
          <SelectFilter
            value={propertyType}
            onChange={(v) => setPropertyType(v as any)}
            placeholder="Property Type"
            options={[
              { value: "all", label: "All Types" },
              { value: "apartment", label: "Apartment" },
              { value: "house", label: "House" },
              { value: "office", label: "Office" },
              { value: "shop", label: "Shop" },
            ]}
          />
          <SelectFilter
            value={status}
            onChange={(v) => setStatus(v as any)}
            placeholder="Status"
            options={[
              { value: "all", label: "All Status" },
              { value: "for sale", label: "For Sale" },
              { value: "for rent", label: "For Rent" },
            ]}
          />
        </div>
      </div>

      {/* ---------------- DESKTOP HEADER ---------------- */}
      <div className="hidden 2xl:flex justify-between items-center">
        {/* Left: filters */}
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
          <SelectFilter
            value={propertyType}
            onChange={(v) => setPropertyType(v as any)}
            placeholder="Property Type"
            options={[
              { value: "all", label: "All Types" },
              { value: "apartment", label: "Apartment" },
              { value: "house", label: "House" },
              { value: "office", label: "Office" },
              { value: "shop", label: "Shop" },
            ]}
          />
          <SelectFilter
            value={status}
            onChange={(v) => setStatus(v as any)}
            placeholder="Status"
            options={[
              { value: "all", label: "All Status" },
              { value: "for sale", label: "For Sale" },
              { value: "for rent", label: "For Rent" },
            ]}
          />
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-3">
          <div className={`${!addNew ? "hidden" : "block"}`}>
            <AddPropertyButton />
          </div>
          <ViewToggle view={view} setView={setView} />
        </div>
      </div>
    </div>
  );
};

export default PropertiesHeader;