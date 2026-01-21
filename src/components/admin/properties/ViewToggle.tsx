"use client";

import { FC } from "react";
import { LayoutGrid, LayoutList } from "lucide-react";

interface Props {
  view: "grid" | "list";
  setView: (v: "grid" | "list") => void;
}

const ViewToggle: FC<Props> = ({ view, setView }) => {
  return (
    <div className="w-fit flex bg-gray-300 rounded-lg p-1">
      <button
        onClick={() => setView("grid")}
        className={`py-3 px-6 rounded-lg transition-all duration-200 cursor-pointer ${
          view === "grid" ? "bg-white shadow text-purple-700" : "text-gray-800"
        }`}
      >
        <LayoutGrid size={18} strokeWidth={1} />
      </button>

      <button
        onClick={() => setView("list")}
        className={`py-3 px-6 rounded-lg transition-all duration-200 cursor-pointer ${
          view === "list" ? "bg-white shadow text-purple-700" : "text-gray-800"
        }`}
      >
        <LayoutList size={18} strokeWidth={1} />
      </button>
    </div>
  );
};

export default ViewToggle;