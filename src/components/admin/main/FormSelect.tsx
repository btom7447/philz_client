"use client";

import { FC } from "react";
import { Controller, FieldPath, UseFormReturn } from "react-hook-form";
import * as Select from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { PropertyFormValues } from "../properties/propertySchema";

interface Option {
  value: string;
  label: string;
}

interface Props {
  form: UseFormReturn<PropertyFormValues>;
  name: FieldPath<PropertyFormValues>;
  label: string;
  options: Option[];
  placeholder?: string;
}

const FormSelect: FC<Props> = ({ form, name, label, options, placeholder }) => {
  const { control, formState } = form;
  const { error } = form.getFieldState(name, formState);
  const displayPlaceholder = placeholder || `Select ${label}`;

  return (
    <div className="flex flex-col gap-1 p-1">
      <label className="text-lg lg:text-xl font-semibold text-gray-700">
        {label}
      </label>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select.Root
            value={String(field.value ?? "")} // empty string for placeholder
            onValueChange={field.onChange}
          >
            <Select.Trigger
              className={`
                flex items-center justify-between gap-2
                bg-white border rounded-lg p-4
                text-lg outline-none
                ${error ? "border-red-500" : "border-gray-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-600"}
                ${field.value ? "text-black" : "text-gray-500"}
              `}
            >
              {/* Show placeholder if value is empty */}
              <Select.Value placeholder={displayPlaceholder} />
              <ChevronDown size={16} className="text-gray-400" />
            </Select.Trigger>

            <Select.Portal>
              <Select.Content className="bg-white rounded-lg shadow-xl overflow-hidden z-50">
                <Select.Viewport className="p-2">
                  {options.map((opt) => (
                    <Select.Item
                      key={opt.value}
                      value={String(opt.value)}
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
        )}
      />

      {/* {error && <p className="text-md text-red-500">{error.message}</p>} */}
    </div>
  );
};

export default FormSelect;
