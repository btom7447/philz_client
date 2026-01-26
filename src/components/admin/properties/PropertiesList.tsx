"use client";

import { FC, useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";

export interface MediaFile {
  url: string;
  public_id: string;
}

export interface IProperty {
  _id: string;
  title: string;
  description: string;
  propertyType: "apartment" | "house" | "office" | "shop";
  address: { city: string; state: string };
  location: { type: "Point"; coordinates: [number, number] };
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  area: number;
  garages: number;
  price: number;
  status: "for sale" | "for rent";
  featured: boolean;
  sold: boolean;
  yearBuilt: number;
  amenities: string[];
  images?: MediaFile[];
  videos?: MediaFile[];
  floorPlans?: MediaFile[];
  additionalDetails: any;
  createdBy: string;
}

interface Props {
  view: "grid" | "list";
  properties: IProperty[];
  onSelectProperty: (id: string) => void;
}

const PropertiesList: FC<Props> = ({ view, properties, onSelectProperty }) => {
    const [collapsed, setCollapsed] = useState(false);

    // Fetch sidebar collapsed state from localStorage
    useEffect(() => {
      const saved = localStorage.getItem("admin_sidebar_collapsed");
      if (saved !== null) {
        setCollapsed(saved === "true");
      }
    }, []);

  return (
    <div
      className={
        view === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-5"
          : "grid grid-cols-1 3xl:grid-cols-2 gap-4 px-5"
      }
    >
      {properties.map((property) => (
        <PropertyCard
          key={property._id}
          property={property}
          view={view}
          collapsed={collapsed}
          onSelect={onSelectProperty}
          onDelete={(id) => {
            console.log("Delete property:", id);
            // later → confirmation modal + API call
          }}
        />
      ))}
    </div>
  );
};

export default PropertiesList;