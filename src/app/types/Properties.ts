export interface Address {
  city: string;
  state: string;
}

export interface Location {
  type: "Point";
  coordinates: [number, number];
}

export type PropertyType = "apartment" | "house" | "office" | "shop";
export type PropertyStatus = "for sale" | "for rent";

export interface MediaFile {
  url: string;
  public_id: string;
}

export interface FetchPropertiesResponse {
  items: IProperty[];
  total: number;
}

export type PropertyTypeOption = PropertyType | "all";
export type PropertyStatusOption = PropertyStatus | "all";

export type PropertyFilters = {
  title?: string;
  location?: string;
  propertyType?: PropertyType;
  status?: PropertyStatus;
  maxPrice?: number;
  amenities?: string[];
};

export type SortOption =
  | "createdAt:desc"
  | "title:asc"
  | "title:desc"
  | "price:asc"
  | "price:desc";

export interface SortOptionItem {
  value: SortOption;
  label: string;
  icon?: React.ReactNode; 
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
  featured: boolean;
  sold: boolean;
  yearBuilt: number;
  amenities: string[];
  images?: MediaFile[];
  videos?: MediaFile[];
  floorPlans?: MediaFile[];
  additionalDetails?: any;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}