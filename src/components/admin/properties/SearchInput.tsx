"use client";

import { FC } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const SearchInput: FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by title or location..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white border border-gray-400 outline-none font-roboto text-black text-lg placeholder:text-gray-500 px-4 py-3 rounded-lg min-w-80 focus:ring-1 focus:ring-purple-600"
    />
  );
};

export default SearchInput;