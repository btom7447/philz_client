"use client";

import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { PropertyFormValues } from "../propertySchema";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import FormTextarea from "../FormTextarea";

interface Props {
  form: UseFormReturn<PropertyFormValues>;
}

const BasicTab: FC<Props> = ({ form }) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-7">
      <FormInput
        label="Title"
        {...register("title")}
        error={errors.title?.message}
      />

      <FormSelect
        form={form}
        name="propertyType"
        label="Property Type"
        placeholder="Select Property Type"
        options={[
          { label: "Apartment", value: "apartment" },
          { label: "House", value: "house" },
          { label: "Office", value: "office" },
          { label: "Shop", value: "shop" },
        ]}
      />

      <FormSelect
        form={form}
        name="featured"
        label="Featured"
        options={[
          { label: "Yes", value: "true" },
          { label: "No", value: "false" },
        ]}
      />

      <FormInput
        type="text"
        label="Year Built"
        {...register("yearBuilt")}
        error={errors.yearBuilt?.message}
      />

      <div className="col-span-1 lg:col-span-2">
        <FormTextarea
          label="Description"
          {...register("description")}
          error={errors.description?.message}
          placeholder="Enter property description..."
        />
      </div>
    </div>
  );
};

export default BasicTab;