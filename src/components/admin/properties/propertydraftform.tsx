"use client";

import { FC, useState, useEffect } from "react";
import { toast } from "sonner";

import { UploadFile, TABS } from "./formTypes";
import { usePropertyFormSubmit } from "@/app/admin/hooks/usePropertyFormSubmit";
import { IPropertyFormValues } from "./propertySchema";
import { usePropertyForm } from "@/app/admin/hooks/usePropertyForm";

// Tabs
import BasicTab from "./tabs/BasicTab";
import LocationTab from "./tabs/LocationTab";
import PricingTab from "./tabs/PricingTab";
import SpecsTab from "./tabs/SpecsTab";
import MediaTab from "./tabs/MediaTab";
import AmenitiesTab from "./tabs/AmenitiesTab";
import ExtrasTab from "./tabs/ExtrasTab";

interface Props {
  mode: "create" | "edit";
  propertyId?: string;
  initialValues: IPropertyFormValues;
}

const PropertyForm: FC<Props> = ({ mode, propertyId, initialValues }) => {
  const { form, activeTab, setActiveTab, isTabComplete, progress } =
    usePropertyForm(initialValues);

  const { submit, isLoading } = usePropertyFormSubmit({ mode, propertyId });

  const [mediaFiles, setMediaFiles] = useState<UploadFile[]>([]);

  // Prefill media safely
  useEffect(() => {
    const files: UploadFile[] = [];

    initialValues.images?.forEach((img) =>
      files.push({
        file: null,
        url: img.url,
        public_id: img.public_id || "",
        type: "image",
      }),
    );
    initialValues.videos?.forEach((vid) =>
      files.push({
        file: null,
        url: vid.url,
        public_id: vid.public_id || "",
        type: "video",
      }),
    );
    initialValues.floorPlans?.forEach((f) =>
      files.push({
        file: null,
        url: f.url,
        public_id: f.public_id || "",
        type: "floorplan",
      }),
    );

    setMediaFiles(files);
  }, [initialValues]);

  // Ensure first tab is active on new property
  useEffect(() => {
    if (mode === "create") setActiveTab(0);
  }, [mode, setActiveTab]);

  const handleSaveDraft = () => toast.success("Draft saved!");

  const handleTabClick = (i: number) => {
    if (i === 0 || isTabComplete(i - 1)) setActiveTab(i);
  };

  const onSubmit = async (data: IPropertyFormValues) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) =>
      typeof value === "object"
        ? formData.append(key, JSON.stringify(value))
        : formData.append(key, String(value)),
    );

    mediaFiles.forEach((f) => f.file && formData.append("files", f.file));

    await submit(formData);
  };

  // Render only the active tab to improve performance
  const renderActiveTab = () => {
    switch (activeTab) {
      case 0:
        return <BasicTab form={form} />;
      case 1:
        return <LocationTab form={form} />;
      case 2:
        return <PricingTab form={form} />;
      case 3:
        return <SpecsTab form={form} />;
      case 4:
        return <MediaTab files={mediaFiles} setFiles={setMediaFiles} />;
      case 5:
        return <AmenitiesTab form={form} />;
      case 6:
        return <ExtrasTab form={form} />;
      default:
        return null;
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-4 border-b">
        {TABS.map((tab, i) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => handleTabClick(i)}
            disabled={i > 0 && !isTabComplete(i - 1)}
            className={`pb-3 text-sm font-medium transition ${
              activeTab === i
                ? "text-purple-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active tab content */}
      <div className="mt-4">{renderActiveTab()}</div>

      {/* Save & Submit */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={handleSaveDraft}
          className="text-gray-600"
        >
          Save & Exit
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-purple-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg"
        >
          {mode === "create" ? "Add Property" : "Update Property"}
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;