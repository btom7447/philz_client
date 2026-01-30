"use client";

import { FC, useState, useEffect, useMemo } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { PropertyFormValues, propertyFormSchema } from "./propertySchema";
import { UploadFile, TABS } from "./formTypes";
import { normalizePropertyForm } from "@/app/utils/normalizePropertyForm";
import { propertyDomainSchema, PropertyDomainValues } from "./propertyDomainSchema";
import { validateMediaFiles } from "@/app/utils/validateMediaFiles";

import BasicTab from "./tabs/BasicTab";
import LocationTab from "./tabs/LocationTab";
import PricingTab from "./tabs/PricingTab";
import SpecsTab from "./tabs/SpecsTab";
import MediaTab from "./tabs/MediaTab";
import AmenitiesTab from "./tabs/AmenitiesTab";
import ExtrasTab from "./tabs/ExtrasTab";

import { Save, SendHorizonal, StepForward } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";

import { FieldPath } from "react-hook-form";

const TAB_COMPONENTS: Record<string, FC<any>> = {
  basic: BasicTab,
  location: LocationTab,
  pricing: PricingTab,
  specs: SpecsTab,
  media: MediaTab,
  amenities: AmenitiesTab,
  extras: ExtrasTab,
};

const TAB_FIELDS: Record<number, FieldPath<PropertyFormValues>[]> = {
  0: ["title", "description", "propertyType", "featured", "yearBuilt"],
  1: [
    "address.city",
    "address.state",
    "location.latitude",
    "location.longitude",
  ],
  2: ["price", "status", "sold"],
  3: ["area", "bedrooms", "bathrooms", "toilets", "garages"],
  4: [],
  5: ["amenities"],
  6: ["additionalDetails"],
};

const LOCAL_STORAGE_KEY = "propertyFormDraft";

interface Props {
  mode: "create" | "edit";
  activeTab: number;
  setActiveTab: (index: number) => void;
  initialValues?: PropertyFormValues;
  propertyId?: string;
  initialMediaFiles?: UploadFile[];
}


const PropertyForm: FC<Props> = ({
  mode,
  activeTab,
  setActiveTab,
  initialValues,
  propertyId,
  initialMediaFiles = [],
}) => {
  // Define a draft type that includes mediaFiles
  type PropertyFormDraft = PropertyFormValues & { mediaFiles?: UploadFile[] };

  // Load draft from localStorage
  const savedDraft =
    typeof window !== "undefined"
      ? localStorage.getItem(LOCAL_STORAGE_KEY)
      : null;

  const draftValues: PropertyFormDraft | undefined = savedDraft
    ? (JSON.parse(savedDraft) as PropertyFormDraft)
    : undefined;

  // --- Helper goes here ---
  const toRequiredNumber = (value: string, label: string): number => {
    const n = Number(value);
    if (isNaN(n)) throw new Error(`${label} must be a valid number`);
    return n;
  };

  const formMethods = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: initialValues || draftValues || undefined,
    mode: "onTouched",
  });

  // Initialize mediaFiles state safely
  const [mediaFiles, setMediaFiles] = useState<UploadFile[]>(() => {
    if (initialMediaFiles.length) return initialMediaFiles;
    if (draftValues?.mediaFiles) return draftValues.mediaFiles;
    return [];
  });

  const [loading, setLoading] = useState(false);
  const [tabErrors, setTabErrors] = useState<boolean[]>(
    Array(TABS.length).fill(false),
  );

  const MemoizedTabComponent = useMemo(
    () => TAB_COMPONENTS[TABS[activeTab].key],
    [activeTab],
  );

  // Autosave form + media files
  useEffect(() => {
    const subscription = formMethods.watch((value) => {
      const draft = { ...value, mediaFiles };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(draft));
    });
    return () => subscription.unsubscribe();
  }, [formMethods, mediaFiles]);

  // Validate current tab
  const validateCurrentTab = async () => {
    const valid = await formMethods.trigger(TAB_FIELDS[activeTab]);
    setTabErrors((prev) => {
      const newErrors = [...prev];
      newErrors[activeTab] = !valid;
      return newErrors;
    });
    return valid;
  };

  const onSubmit: SubmitHandler<PropertyFormValues> = async (data) => {
    try {
      setLoading(true);

      // 1️⃣ Decide propertyId
      const resolvedPropertyId =
        mode === "edit" ? propertyId : crypto.randomUUID();

      if (!resolvedPropertyId) {
        throw new Error("Missing property ID");
      }

      // 2️⃣ Validate media
      await validateMediaFiles(mediaFiles);

      // 3️⃣ Upload media
      const uploadFormData = new FormData();
      uploadFormData.append("propertyId", resolvedPropertyId);

      // Client: FormData append
      mediaFiles.forEach((f) => {
        if (!f.file) return;

        switch (f.type) {
          case "image":
            uploadFormData.append("images", f.file);
            break;
          case "video":
            uploadFormData.append("videos", f.file);
            break;
          case "floorPlan":
            uploadFormData.append("floorPlans", f.file);
            break;
        }
      });

      const uploadRes = await fetch("/api/uploads/property", {
        method: "POST",
        body: uploadFormData,
      });

      if (!uploadRes.ok) throw new Error("Media upload failed");

      const { files } = await uploadRes.json();

      // 4️⃣ Normalize + attach media
      const normalized = normalizePropertyForm(data);

      const payload = {
        ...normalized,
        images: files.filter((f: any) => f.type === "image"),
        videos: files.filter((f: any) => f.type === "video"),
        floorPlans: files.filter((f: any) => f.type === "floorPlan"),
      };

      propertyDomainSchema.parse(payload);

      // 5️⃣ Submit JSON
      const res = await fetch(
        mode === "create"
          ? "/api/properties"
          : `/api/properties/${resolvedPropertyId}`,
        {
          method: mode === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) throw new Error("Submission failed");

      toast.success(
        mode === "create" ? "Property created!" : "Property updated!",
      );

      formMethods.reset();
      setMediaFiles([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setActiveTab(0);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const progress = ((activeTab + 1) / TABS.length) * 100;

  return (
    <div className="px-5 ">
      <FormProvider {...formMethods}>
        {/* Active Tab */}
        <div className="flex-1 overflow-y-auto">
          <MemoizedTabComponent
            form={formMethods}
            files={mediaFiles}
            setFiles={setMediaFiles}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-5 mt-6 mb-5">
          <button
            type="button"
            className="flex items-center gap-2 border border-purple-700 text-purple-700 font-roboto text-xl px-6 py-3 rounded-lg hover:bg-purple-100 transition cursor-pointer"
            onClick={() => {
              localStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify({ ...formMethods.getValues(), mediaFiles }),
              );
              toast.success("Draft saved!");
            }}
          >
            <Save className="w-7 h-7" strokeWidth={1} /> Save Draft
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={async () => {
              const valid = await validateCurrentTab();
              if (!valid) return;

              if (activeTab < TABS.length - 1) {
                setActiveTab(activeTab + 1);
              } else {
                formMethods.handleSubmit(onSubmit)();
              }
            }}
            className={`
              flex items-center gap-2 font-roboto text-xl px-6 py-3 rounded-lg transition cursor-pointer
              ${loading || activeTab < TABS.length - 1 ? "border bg-purple-200 border-purple-600 text-purple-700" : "bg-purple-700 hover:bg-purple-800 text-white"}
            `}
          >
            {loading && <ClipLoader size={20} color="#fff" />}
            {activeTab < TABS.length - 1
              ? "Continue"
              : loading
                ? "Submitting"
                : "Submit"}
            <StepForward className="w-6 h-7" strokeWidth={1} />
          </button>
        </div>
      </FormProvider>
    </div>
  );
};

export default PropertyForm;