"use client";

import { forwardRef, InputHTMLAttributes, useEffect, useState } from "react";

interface Props extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  label: string;
  value?: string; // ISO string
  onChange: (value: string) => void; // custom handler returns ISO string
  error?: string;
}

const FormDateInput = forwardRef<HTMLInputElement, Props>(
  ({ label, value, onChange, error, ...props }, ref) => {
    const [localValue, setLocalValue] = useState("");

    useEffect(() => {
      if (!value) {
        setLocalValue("");
        return;
      }
      const dt = new Date(value);
      if (!isNaN(dt.getTime())) {
        const tzOffset = dt.getTimezoneOffset() * 60000;
        const localDt = new Date(dt.getTime() - tzOffset);
        setLocalValue(localDt.toISOString().slice(0, 16));
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value);
      if (e.target.value) {
        const dt = new Date(e.target.value);
        if (!isNaN(dt.getTime())) {
          onChange(dt.toISOString());
        }
      }
    };

    return (
      <div className="flex flex-col gap-2 p-1">
        <label className="text-lg lg:text-xl font-semibold text-gray-700">
          {label}
        </label>
        <input
          ref={ref}
          type="datetime-local"
          value={localValue}
          onChange={handleChange}
          className={`w-full rounded-lg border p-4 font-roboto text-black text-xl outline-none transition focus:ring-1 focus:ring-purple-600 focus:border-0 ${
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300"
          }`}
          {...props}
        />
        {error && <p className="text-red-500 text-md">{error}</p>}
      </div>
    );
  },
);


FormDateInput.displayName = "FormDateInput";

export default FormDateInput;