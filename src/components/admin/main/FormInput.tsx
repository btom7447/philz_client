"use client";

import { forwardRef, InputHTMLAttributes, useState, useEffect } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  formatThousands?: boolean; // NEW: format value with commas
}

const FormInput = forwardRef<HTMLInputElement, Props>(
  ({ label, error, type, formatThousands, value, onChange, ...props }, ref) => {
    const inputType = type === "number" ? "text" : type || "text";

    // Internal state to handle formatted display
    const [displayValue, setDisplayValue] = useState(value ?? "");

    // Keep displayValue in sync if controlled externally
    useEffect(() => {
      if (value !== undefined) {
        setDisplayValue(
          formatThousands && value !== ""
            ? Number(value).toLocaleString()
            : value,
        );
      }
    }, [value, formatThousands]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let rawValue = e.target.value.replace(/,/g, ""); // remove commas

      setDisplayValue(
        formatThousands
          ? rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",") // add commas
          : rawValue,
      );

      // Propagate raw numeric value if onChange exists
      if (onChange) {
        // For numeric inputs, send as number
        onChange({
          ...e,
          target: { ...e.target, value: rawValue },
        } as any);
      }
    };

    return (
      <div className="flex flex-col gap-1 p-1">
        <label className="text-lg lg:text-xl font-semibold text-gray-700">
          {label}
        </label>

        <input
          ref={ref}
          type={inputType}
          value={displayValue}
          onChange={handleChange}
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

        {/* {error && <p className="text-md text-red-500">{error}</p>} */}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export default FormInput;