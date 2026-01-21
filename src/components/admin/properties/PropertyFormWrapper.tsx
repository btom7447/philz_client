"use client";

import { useState } from "react";
import PropertyForm from "./PropertyForm";
import { TABS } from "./formTypes";

interface Props {
  mode: "create" | "edit";
  initialValues?: any;
}

const PropertyFormWrapper: React.FC<Props> = ({ mode, initialValues }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  return (
    <div className="bg-white border border-gray-300 rounded-lg w-full">
      {/* Tabs */}
      <div className="w-full h-fit overflow-y-hidden flex gap-10 border-b border-gray-200 mb-10 relative px-5 pt-5 overflow-x-scroll lg:overflow-x-auto ">
        {TABS.map((tab, i) => {
          const isActive = activeTab === i;
          const direction = i > prevIndex ? "origin-left" : "origin-right";

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setPrevIndex(activeTab);
                setActiveTab(i);
              }}
              className={`relative pb-3 px-3 text-xl font-light transition-colors cursor-pointer ${
                isActive
                  ? "text-purple-700 font-semibold"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}

              {/* Sliding underline */}
              <span
                className={`absolute left-0 -bottom-0.5 h-0.5 w-full
                  bg-purple-700
                  transition-transform duration-300 ease-out
                  ${isActive ? "scale-x-100 " + direction : "scale-x-0"}`}
              />
            </button>
          );
        })}
      </div>

      <PropertyForm
        mode={mode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        initialValues={initialValues}
      />
    </div>
  );
};

export default PropertyFormWrapper;