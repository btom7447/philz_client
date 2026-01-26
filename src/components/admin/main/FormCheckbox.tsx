"use client";

import { FC } from "react";

interface Props {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const FormCheckbox: FC<Props> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center
          transition-colors duration-200 ease-in-out
          ${checked ? "bg-purple-700 border-purple-700" : "bg-white border-gray-300"}`}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`w-3 h-3 bg-white rounded-sm transform scale-0 transition-transform duration-200 ${
            checked ? "scale-100" : "scale-0"
          }`}
        />
      </div>
      <span className="font-medium text-gray-700">{label}</span>
    </label>
  );
};

export default FormCheckbox;