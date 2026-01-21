"use client";

import { useMemo, useState } from "react";
import PropertiesHeader from "@/components/admin/properties/PropertiesHeader";
import PropertiesList, {
  IProperty,
} from "@/components/admin/properties/PropertiesList";
import PropertiesDashboardMap from "@/components/admin/properties/PropertiesDashboardMap";
import { useProperties } from "@/app/admin/hooks/useAdminData";

export default function PropertiesDashboard() {
  const { data: properties = [], isLoading } = useProperties();

  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState<
    IProperty["propertyType"] | "all"
  >("all");
  const [status, setStatus] = useState<IProperty["status"] | "all">("all");

  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null,
  );

  /** 🔎 Filtering logic */
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.state.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        propertyType === "all" || p.propertyType === propertyType;

      const matchesStatus = status === "all" || p.status === status;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [properties, searchQuery, propertyType, status]);

  if (isLoading) return <div>Loading dashboard...</div>;

  return (
    <div className="bg-purple-50 flex flex-col h-full gap-5">
      <PropertiesHeader
        view={view}
        setView={setView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        propertyType={propertyType}
        setPropertyType={setPropertyType}
        status={status}
        setStatus={setStatus}
      />

      <div className="flex flex-1 gap-0">
        <div className="flex-1 xl:-mr-5">
          <PropertiesList
            view={view}
            properties={filteredProperties}
            onSelectProperty={setSelectedPropertyId}
          />
        </div>

        <div className="px-5 hidden 2xl:block">
          <div className="rounded-lg overflow-hidden w-1/3 min-w-120 h-full flex-1">
            <PropertiesDashboardMap
              properties={filteredProperties}
              selectedPropertyId={selectedPropertyId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}