"use client";

import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { PropertyFormValues } from "../propertySchema";
import FormInput from "../FormInput";

interface Props {
  form: UseFormReturn<PropertyFormValues>;
}

const SpecsTab: FC<Props> = ({ form }) => {
  const { register } = form;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-7">
      <FormInput
        type="text"
        label="Area (sqm)"
        formatThousands
        {...register("area")}
      />
      <FormInput
        type="text"
        label="Bedrooms"
        formatThousands
        {...register("bedrooms")}
      />
      <FormInput
        type="text"
        label="Bathrooms"
        formatThousands
        {...register("bathrooms")}
      />
      <FormInput
        type="text"
        label="Toilets"
        formatThousands
        {...register("toilets")}
      />
      <FormInput
        type="number"
        label="Parking Space"
        formatThousands
        {...register("garages")}
      />
    </div>
  );
};

export default SpecsTab;