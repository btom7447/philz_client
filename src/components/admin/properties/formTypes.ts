export type UploadType = "image" | "video" | "floorPlan";

export interface UploadFile {
  file: File | null;
  url: string;
  public_id?: string;
  type: UploadType;
}

export interface Tab {
  key: string;
  label: string;
}

// Basic tab order
export const TABS = [
  { key: "basic", label: "Basic" },
  { key: "location", label: "Location" },
  { key: "pricing", label: "Pricing" },
  { key: "specs", label: "Specifications" },
  { key: "media", label: "Media" },
  { key: "amenities", label: "Amenities" },
  { key: "extras", label: "Extras" },
];