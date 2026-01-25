import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { PropertyFormValues } from "@/components/admin/properties/propertySchema";

const STORAGE_KEY = "admin_property_form_tab";

export const TAB_FIELDS: Record<
  number,
  (keyof PropertyFormValues | string)[]
> = {
  0: ["title", "description", "propertyType", "featured", "yearBuilt"],
  1: [
    "address.city",
    "address.state",
    "location.latitude",
    "location.longitude",
  ],
  2: ["price", "status", "sold"],
  3: ["area", "bedrooms", "bathrooms", "toilets", "garages"],
  4: [], // media handled separately
  5: ["amenities"],
  6: ["additionalDetails"],
};

export const usePropertyForm = (defaultValues: PropertyFormValues) => {
  const form = useForm<PropertyFormValues>({
    defaultValues,
    mode: "onChange",
  });

  const [activeTab, setActiveTab] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? Number(saved) : 0;
  });

  const formValues = useWatch({ control: form.control });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(activeTab));
  }, [activeTab]);

  // Auto-advance tab
  useEffect(() => {
    const checkNextTab = async () => {
      const valid = await form.trigger(TAB_FIELDS[activeTab] as any);
      if (valid && activeTab < Object.keys(TAB_FIELDS).length - 1)
        setActiveTab((t) => t + 1);
    };
    checkNextTab();
  }, [formValues, activeTab, form]);

  const isTabComplete = (tabIndex: number) =>
    (TAB_FIELDS[tabIndex] || []).every((field) => {
      const val = form.getValues(field as any);
      return val !== undefined && val !== "" && val !== null;
    });

  const progress = Math.round(
    (Object.keys(TAB_FIELDS).filter((_, i) => isTabComplete(i)).length /
      Object.keys(TAB_FIELDS).length) *
      100,
  );

  return { form, activeTab, setActiveTab, isTabComplete, progress };
};