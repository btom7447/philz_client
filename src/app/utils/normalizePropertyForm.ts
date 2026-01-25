import { PropertyFormValues } from "@/components/admin/properties/propertySchema";
import { PropertyDomainValues } from "@/components/admin/properties/propertyDomainSchema";

// Helper to convert string with commas to number
const toNumber = (v: string | undefined) => {
  if (!v) return undefined;
  const n = Number(v.replace(/,/g, "")); // remove commas
  return isNaN(n) ? undefined : n;
};

export const normalizePropertyForm = (
  raw: PropertyFormValues,
): PropertyDomainValues => {
  return {
    title: raw.title.trim(),
    description: raw.description.trim(),

    propertyType: raw.propertyType,

    featured: raw.featured === "true",
    sold: raw.sold === "true",

    yearBuilt: toNumber(raw.yearBuilt) || 0, // default 0 or throw error
    price: toNumber(raw.price) || 0,

    status: raw.status,

    area: toNumber(raw.area),
    bedrooms: toNumber(raw.bedrooms),
    bathrooms: toNumber(raw.bathrooms),
    toilets: toNumber(raw.toilets),
    garages: toNumber(raw.garages),

    address: raw.address,

    location: {
      latitude: toNumber(raw.location.latitude) || 0,
      longitude: toNumber(raw.location.longitude) || 0,
    },

    amenities: raw.amenities,
    additionalDetails: raw.additionalDetails,
  };
};