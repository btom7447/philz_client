"use client";

import { FC } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<Props> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-5 py-6">
      {/* LEFT INFO */}
      <p className="text-base text-gray-600">
        Showing{" "}
        <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span>{" "}
        –{" "}
        <span className="font-medium">
          {Math.min(currentPage * pageSize, totalItems)}
        </span>{" "}
        of <span className="font-medium">{totalItems}</span> properties
      </p>

      {/* CONTROLS */}
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center gap-1 px-5 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700
                     disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-700 hover:bg-purple-100 transition cursor-pointer"
        >
          <ChevronLeft size={16} /> Prev
        </button>

        <span className="text-sm text-gray-700 mx-3">
          Page <span className="font-semibold">{currentPage}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center gap-1 px-5 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700
                     disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-700 hover:bg-purple-100 transition cursor-pointer"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;