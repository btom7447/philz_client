"use client";

import { FC, TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const FormTextarea: FC<Props> = ({ label, error, ...props }) => {
  return (
    <div className="flex flex-col gap-1 p-1">
      <label className="text-lg lg:text-xl font-semibold text-gray-700">
        {label}
      </label>

      <textarea
        {...props}
        className={`w-full rounded-lg border p-4 font-roboto text-black text-xl outline-none transitionfocus-within:ring-purple-800 transition focus-within:border-0 min-h-50
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
};

export default FormTextarea;