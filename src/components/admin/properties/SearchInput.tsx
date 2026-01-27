"use client";

import { FC } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string; // optional, existing components can ignore
}

const SearchInput: FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder ?? "Search by title or location..."} // fallback
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      } // ✅ type for 'v'
      className="bg-white border border-gray-400 outline-none font-roboto text-black text-lg placeholder:text-gray-500 px-4 py-3 rounded-lg w-full focus:ring-1 focus:ring-purple-600"
    />
  );
};

export default SearchInput;
