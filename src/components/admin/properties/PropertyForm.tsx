import { FC, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { propertySchema, IPropertyFormValues } from "./propertySchema";
import { UploadFile, TABS } from "./formTypes";

import BasicTab from "./tabs/BasicTab";
import LocationTab from "./tabs/LocationTab";
import PricingTab from "./tabs/PricingTab";
import SpecsTab from "./tabs/SpecsTab";
import MediaTab from "./tabs/MediaTab";
import AmenitiesTab from "./tabs/AmenitiesTab";
import ExtrasTab from "./tabs/ExtrasTab";
import { Save, Send, SendHorizonal } from "lucide-react";

const TAB_COMPONENTS: Record<string, FC<any>> = {
  basic: BasicTab,
  location: LocationTab,
  pricing: PricingTab,
  specs: SpecsTab,
  media: MediaTab,
  amenities: AmenitiesTab,
  extras: ExtrasTab,
};

interface Props {
  mode: "create" | "edit";
  activeTab: number;
  setActiveTab: (index: number) => void;
  initialValues?: IPropertyFormValues;
}

const PropertyForm: FC<Props> = ({
  mode,
  activeTab,
  setActiveTab,
  initialValues,
}) => {
  const formMethods = useForm<IPropertyFormValues>({
    defaultValues: initialValues || {},
    resolver: zodResolver(propertySchema),
  });

  const [mediaFiles, setMediaFiles] = useState<UploadFile[]>([]);

  const onSubmit = async (data: IPropertyFormValues) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) =>
        typeof value === "object"
          ? formData.append(key, JSON.stringify(value))
          : formData.append(key, String(value)),
      );
      mediaFiles.forEach((f) => f.file && formData.append("files", f.file));

      const res = await fetch(
        mode === "create" ? "/api/properties" : `/api/properties/${data}`,
        { method: mode === "create" ? "POST" : "PATCH", body: formData },
      );

      if (!res.ok) throw new Error("Failed to submit property");
      toast.success("Property saved successfully!");
    } catch (err: any) {
      toast.error(err.message || "Server error");
    }
  };

  const ActiveTabComponent = TAB_COMPONENTS[TABS[activeTab].key];

  return (
    <FormProvider {...formMethods}>
      <div className="max-h-screen overflow-y-auto p-5 space-y-5">
        <form
          onSubmit={formMethods.handleSubmit(onSubmit)}
          className="flex flex-col h-full justify-between"
        >
          {/* Active Tab */}
          {ActiveTabComponent && (
            <div className="flex-1 overflow-y-auto">
              <ActiveTabComponent
                form={formMethods}
                files={mediaFiles}
                setFiles={setMediaFiles}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-start gap-5 mt-15">
            <button
              type="button"
              onClick={() => toast.success("Draft saved!")}
              className="flex items-center gap-2 border borde-purple-700 text-purple-700 font-roboto text-xl px-6 py-3 rounded-lg hover:bg-purple-100 transition cursor-pointer"
            >
              <Save className="w-7 h-7" strokeWidth={1} />
              Save Draft
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-purple-700 text-white font-roboto text-xl px-6 py-3 rounded-lg hover:bg-purple-800 transition cursor-pointer"
            >
              <SendHorizonal className="w-7 h-7" strokeWidth={1} />
              {mode === "create" ? "Add Property" : "Update Property"}
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default PropertyForm;