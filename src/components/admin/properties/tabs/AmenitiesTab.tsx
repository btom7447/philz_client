"use client";

import { FC } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import { IPropertyFormValues } from "../propertySchema";
import AmenitiesSelect from "../AmenitiesSelect";

const presetAmenities = [
  { label: "Swimming Pool", value: "Swimming Pool" },
  { label: "Gym", value: "Gym" },
  { label: "Parking", value: "Parking" },
  { label: "WiFi", value: "WiFi" },
];

interface Props {
  form: UseFormReturn<IPropertyFormValues>;
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
          creatable={true}
        />
      )}
    />
  );
};

export default AmenitiesTab;