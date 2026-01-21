"use client";

import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { IPropertyFormValues } from "../propertySchema";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";

interface Props {
  form: UseFormReturn<IPropertyFormValues>;
}

const PricingTab: FC<Props> = ({ form }) => {
  const { register } = form;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-7">
      <FormInput type="text" label="Price" {...register("price")} />
      <FormSelect
        form={form}
        name="status"
        label="Status"
        placeholder="Select Property Status"
        options={[
          { label: "For Sale", value: "for sale" },
          { label: "For Rent", value: "for rent" },
        ]}
      />

      <FormSelect
        form={form}
        name="sold"
        label="Sold"
        placeholder="Select Purchase Status"
        options={[
          { label: "Yes", value: "true" },
          { label: "No", value: "false" },
        ]}
      />
    </div>
  );
};

export default PricingTab;
