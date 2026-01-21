"use client";

import { forwardRef, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  valueAsNumber?: boolean; // optional, for RHF
}

const FormInput = forwardRef<HTMLInputElement, Props>(
  ({ label, error, type, valueAsNumber, ...props }, ref) => {
    // Force number inputs to render as text so NaN never appears
    const inputType = type === "number" ? "text" : type || "text";

    return (
      <div className="flex flex-col gap-1">
        <label className="text-lg lg:text-xl font-semibold text-gray-700">
          {label}
        </label>

        <input
          ref={ref}
          type={inputType}
          {...props}
          className={`w-full rounded-lg border p-4 font-roboto text-black text-xl outline-none
            transition focus-within:ring-purple-800 focus-within:border-0
            ${
              error
                ? "border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-gray-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
            }
          `}
        />

        {error && <p className="text-md text-red-500">{error}</p>}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export default FormInput;