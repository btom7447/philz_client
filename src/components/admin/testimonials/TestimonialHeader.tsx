"use client";

import { FC, useState } from "react";
import { Filter } from "lucide-react";
import SearchInput from "@/components/admin/properties/SearchInput";
import SelectFilter from "@/components/admin/properties/SelectFilter";
import ViewToggle from "@/components/admin/properties/ViewToggle";
import AddTestimonialButton from "./AddTestimonialButton";

interface Props {
  view: "grid" | "list";
  setView: (v: "grid" | "list") => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  rating: number | "all";
  setRating: (v: number | "all") => void;
  approved: boolean | "all";
  setApproved: (v: boolean | "all") => void;
  addNew?: boolean;
  onAddClick?: () => void;
}

const TestimonialsHeader: FC<Props> = ({
  view,
  setView,
  searchQuery,
  setSearchQuery,
  rating,
  setRating,
  approved,
  setApproved,
  addNew = true,
  onAddClick,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="p-5 bg-white border-b border-gray-300 flex flex-col gap-3">
      {/* ---------------- MOBILE HEADER ---------------- */}
      <div className="flex justify-between items-center 2xl:hidden">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex items-center gap-2 bg-purple-700 text-white font-roboto text-xl px-6 py-3 rounded-lg hover:bg-purple-800 transition cursor-pointer"
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>

        {addNew && (
          <div>
            <AddTestimonialButton onClick={onAddClick} />
          </div>
        )}
      </div>

      {/* Mobile accordion */}
      <div
        className={`overflow-hidden transition-all duration-300 2xl:hidden`}
        style={{ maxHeight: mobileOpen ? "1000px" : "0px" }}
      >
        <div className="flex flex-col gap-3 pt-4 border-t border-gray-300 mt-2">
          <ViewToggle view={view} setView={setView} />
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
          <SelectFilter
            value={String(rating)}
            onChange={(v) => setRating(v === "all" ? "all" : Number(v))}
            placeholder="Rating"
            options={[
              { value: "all", label: "All Ratings" },
              { value: "5", label: "5 Stars" },
              { value: "4", label: "4 Stars" },
              { value: "3", label: "3 Stars" },
              { value: "2", label: "2 Stars" },
              { value: "1", label: "1 Star" },
            ]}
          />
          <SelectFilter
            value={String(approved)}
            onChange={(v) => setApproved(v === "all" ? "all" : v === "true")}
            placeholder="Approval"
            options={[
              { value: "all", label: "All" },
              { value: "true", label: "Approved" },
              { value: "false", label: "Unapproved" },
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
            value={String(rating)}
            onChange={(v) => setRating(v === "all" ? "all" : Number(v))}
            placeholder="Rating"
            options={[
              { value: "all", label: "All Ratings" },
              { value: "5", label: "5 Stars" },
              { value: "4", label: "4 Stars" },
              { value: "3", label: "3 Stars" },
              { value: "2", label: "2 Stars" },
              { value: "1", label: "1 Star" },
            ]}
          />
          <SelectFilter
            value={String(approved)}
            onChange={(v) => setApproved(v === "all" ? "all" : v === "true")}
            placeholder="Approval"
            options={[
              { value: "all", label: "All" },
              { value: "true", label: "Approved" },
              { value: "false", label: "Unapproved" },
            ]}
          />
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-3">
          {addNew && (
            <div>
              <AddTestimonialButton onClick={onAddClick} />
            </div>
          )}
          <ViewToggle view={view} setView={setView} />
        </div>
      </div>
    </div>
  );
};

export default TestimonialsHeader;