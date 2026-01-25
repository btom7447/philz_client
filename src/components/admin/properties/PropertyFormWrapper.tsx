"use client";

import { useState } from "react";
import PropertyForm from "./PropertyForm";
import { TABS } from "./formTypes";

interface Props {
  mode: "create" | "edit";
  initialValues?: any;
  tabErrors?: boolean[];
}

const PropertyFormWrapper: React.FC<Props> = ({
  mode,
  initialValues,
  tabErrors,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  return (
    <div className="bg-white border border-gray-300 rounded-lg w-full">
      {/* Tabs */}
      <div className="w-full flex gap-10 border-b border-gray-200 relative px-5 pt-5 overflow-x-auto overflow-y-hidden">
        {TABS.map((tab, i) => {
          const isActive = activeTab === i;
          const hasError = tabErrors && tabErrors[i];
          const direction = i > prevIndex ? "origin-left" : "origin-right";

          return (
            <div key={tab.key} className="relative flex flex-col items-start">
              <button
                type="button"
                onClick={() => {
                  setPrevIndex(activeTab);
                  setActiveTab(i);
                }}
                className={`relative pb-3 px-3 text-xl font-light transition-colors cursor-pointer
                  ${isActive ? "text-purple-700 font-semibold" : "text-gray-500 hover:text-gray-800"}
                  ${hasError ? "text-red-600" : ""}
                `}
              >
                {tab.label}

                {/* Red dot for errors */}
                {hasError && (
                  <span className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-red-500" />
                )}

                {/* Sliding underline */}
                <span
                  className={`absolute left-0 -bottom-0.5 h-0.5 w-full
                    bg-purple-700
                    transition-transform duration-300 ease-out
                    ${isActive ? "scale-x-100 " + direction : "scale-x-0"}`}
                />
              </button>

              {/* Error message under label */}
              {hasError && (
                <span className="text-red-600 text-xs mt-1">
                  Please fix errors in this tab
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar under tabs */}
      <div className="mb-5 w-full h-1 bg-gray-200">
        <div
          className="h-1 bg-purple-600 transition-all duration-300"
          style={{ width: `${((activeTab + 1) / TABS.length) * 100}%` }}
        />
      </div>

      <PropertyForm
        mode={mode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        initialValues={initialValues}
        propertyId={initialValues?._id}
      />
    </div>
  );
};

export default PropertyFormWrapper;