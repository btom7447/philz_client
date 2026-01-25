"use client";

import { FC } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import { PropertyFormValues } from "../propertySchema";
import AmenitiesSelect from "../AmenitiesSelect";
import { AMENITY_ICONS } from "@/app/utils/icons";

// Generate options from the icons map and sort alphabetically by label
export const presetAmenities = Object.entries(AMENITY_ICONS)
  .map(([key]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: key,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

interface Props {
  form: UseFormReturn<PropertyFormValues>;
}

const AmenitiesTab: FC<Props> = ({ form }) => {
  const { control } = form;

  return (
    <Controller
      control={control}
      name="amenities"
      render={({ field }) => (
        <AmenitiesSelect
          value={field.value}
          label="Amenities"
          onChange={field.onChange}
          options={presetAmenities}
          creatable={true} // can still add custom ones
        />
      )}
    />
  );
};

export default AmenitiesTab;