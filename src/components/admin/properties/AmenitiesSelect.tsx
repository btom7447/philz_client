"use client";

import { FC } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  value?: string[];
  onChange: (value: string[]) => void;
  options?: Option[];
  error?: string;
  creatable?: boolean; // whether new options can be created
}

const AmenitiesSelect: FC<Props> = ({
  label,
  value = [],
  onChange,
  options = [],
  error,
  creatable = true,
}) => {
  const mappedValue = value.map((v) => ({ label: v, value: v }));

  const SelectComponent = creatable ? CreatableSelect : Select;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xl font-semibold text-gray-700">{label}</label>

      <SelectComponent
        isMulti
        placeholder="Select amenities"
        value={mappedValue}
        options={options}
        onChange={(items) => onChange(items.map((item) => item.value))}
        className="text-xl"
        menuPortalTarget={
          typeof document !== "undefined" ? document.body : null
        }
        menuPosition="fixed"
        styles={{
          control: (base, state) => ({
            ...base,
            borderRadius: "0.5rem",
            minHeight: "45px",
            borderColor: error ? "#f87171" : "#d1d5db",
            boxShadow: state.isFocused
              ? error
                ? "0 0 0 1px #f87171"
                : "0 0 0 1px #7c3aed"
              : "none",
            "&:hover": {
              borderColor: state.isFocused ? "#7c3aed" : base.borderColor,
            },
          }),
          menu: (base) => ({ ...base, borderRadius: "0.5rem", zIndex: 50 }),
          menuList: (base) => ({ ...base, maxHeight: 200, overflowY: "auto" }),
          multiValue: (base) => ({ ...base, backgroundColor: "#ede9fe" }),
          multiValueLabel: (base) => ({ ...base, color: "#5b21b6" }),
          multiValueRemove: (base) => ({
            ...base,
            color: "#5b21b6",
            ":hover": { backgroundColor: "#7c3aed", color: "white" },
          }),
        }}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default AmenitiesSelect;