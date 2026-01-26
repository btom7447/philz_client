"use client";

import { FC } from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}

const ModalFormSelect: FC<Props> = ({ label, value, onChange, options }) => {
  return (
    <div className="flex flex-col gap-1 p-1">
      <label className="text-lg lg:text-xl font-semibold text-gray-700">
        {label}
      </label>

      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger
          className={`
            flex items-center justify-between gap-2
            bg-white border rounded-lg p-4
            text-lg outline-none
            ${value ? "text-black" : "text-gray-500"}
          `}
        >
          <Select.Value placeholder={`Select ${label}`} />
          <ChevronDown size={16} className="text-gray-400" />
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="bg-white rounded-lg shadow-xl overflow-hidden z-50">
            <Select.Viewport className="p-2">
              {options.map((opt) => (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  className="px-4 py-3 rounded-lg text-lg cursor-pointer outline-0
                    text-gray-700 focus:text-purple-700 data-[state=checked]:text-purple-700 data-[state=checked]:bg-purple-200
                    hover:bg-purple-200 hover:text-purple-700"
                >
                  <Select.ItemText>{opt.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default ModalFormSelect;