"use client";

import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { PropertyFormValues } from "../propertySchema";
import FormTextarea from "../FormTextarea";

interface Props {
  form: UseFormReturn<PropertyFormValues>;
}

const ExtrasTab: FC<Props> = ({ form }) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-7">
      <div className="col-span-1 lg:col-span-2">
        <FormTextarea
          label="Additional Details"
          {...register("additionalDetails")}
          error={errors.additionalDetails?.message}
          placeholder="Enter additional details about property..."
        />
      </div>
    </div>
  );
};

export default ExtrasTab;