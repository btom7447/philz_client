"use client";

import { FC, ReactNode } from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

interface Option<T extends string> {
  value: T;
  label: ReactNode;
  icon?: ReactNode; // optional icon
}

interface Props<T extends string> {
  value: T;
  onChange: (v: T) => void;
  placeholder: string;
  options: Option<T>[];
}

const SelectFilter = <T extends string>({
  value,
  onChange,
  placeholder,
  options,
}: Props<T>) => {
  return (
    <Select.Root value={value} onValueChange={(v) => onChange(v as T)}>
      <Select.Trigger
        className={`
          flex items-center justify-between gap-2
          bg-transparent border border-gray-400 rounded-lg px-6 py-3 min-w-40 max-w-full
          text-lg outline-none
          ${value !== "all" ? "text-black" : "text-gray-500"}
        `}
      >
        <Select.Value placeholder={placeholder} />
        <ChevronDown size={16} className="text-gray-400" />
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="bg-white rounded-lg shadow-xl overflow-hidden z-50">
          <Select.Viewport className="p-2">
            {options.map((o) => (
              <Select.Item
                key={o.value}
                value={o.value}
                className="px-4 py-3 rounded-lg text-lg cursor-pointer outline-0
                  text-gray-700 focus:text-purple-700 data-[state=checked]:text-purple-700 data-[state=checked]:bg-purple-200 hover:bg-purple-200 hover:text-purple-700 flex items-center gap-2"
              >
                <Select.ItemText>{o.label}</Select.ItemText>
                {o.icon && <span className="shrink-0">{o.icon}</span>}
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectFilter;