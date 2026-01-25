export interface Address {
  city: string;
  state: string;
}

export interface Location {
  type: "Point";
  coordinates: [number, number]; // [lng, lat]
}

export type PropertyType = "apartment" | "house" | "office" | "shop";
export type PropertyStatus = "for sale" | "for rent";

export interface MediaFile {
  url: string;
  public_id: string;
}

export interface IProperty {
  _id: string;
  title: string;
  description: string;
  propertyType: PropertyType;
  address: Address;
  location: Location;
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  area: number;
  garages: number;
  price: number;
  status: PropertyStatus;
  featured?: boolean;
  sold?: boolean;
  yearBuilt: number;
  amenities?: string[];
  images?: MediaFile[];
  videos?: MediaFile[];
  floorPlans?: MediaFile[];
  additionalDetails?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
