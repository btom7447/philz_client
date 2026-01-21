"use client";

import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { IPropertyFormValues } from "../propertySchema";
import FormInput from "../FormInput";

interface Props {
  form: UseFormReturn<IPropertyFormValues>;
}

const SpecsTab: FC<Props> = ({ form }) => {
  const { register } = form;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-7">
      <FormInput type="text" label="Area (sqm)" {...register("area")} />
      <FormInput type="text" label="Bedrooms" {...register("bedrooms")} />
      <FormInput type="text" label="Bathrooms" {...register("bathrooms")} />
      <FormInput type="text" label="Toilets" {...register("toilets")} />
      <FormInput type="number" label="Garages" {...register("garages")} />
    </div>
  );
};

export default SpecsTab;