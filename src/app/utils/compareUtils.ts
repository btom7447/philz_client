import { IProperty } from "@/app/types/Properties";
import { toast } from "sonner";

const COMPARE_KEY = "compare";
const MAX_COMPARE = 3;

export const getCompareIds = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(COMPARE_KEY) || "[]");
  } catch {
    return [];
  }
};

export const setCompareIds = (ids: string[]) => {
  localStorage.setItem(COMPARE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event("compareUpdate"));
};

// Toggle property in compare list
export const toggleCompare = (propertyId: string): boolean => {
  const ids = getCompareIds();

  if (ids.includes(propertyId)) {
    // Remove property
    const newIds = ids.filter((id) => id !== propertyId);
    setCompareIds(newIds);
    return false;
  }

  if (ids.length >= MAX_COMPARE) {
    toast(`You can only compare ${MAX_COMPARE} properties at a time`);
    return false;
  }

  const newIds = [...ids, propertyId];
  setCompareIds(newIds);
  return true;
};

// Filter full property objects given all properties
export const filterCompareProperties = (
  allProperties: IProperty[],
): IProperty[] => {
  const ids = getCompareIds();
  return allProperties.filter((p) => ids.includes(p._id));
};