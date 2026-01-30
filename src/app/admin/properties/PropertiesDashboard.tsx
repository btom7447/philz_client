"use client";

import { useMemo, useState } from "react";
import { IProperty } from "@/app/types/Properties";
import PropertiesHeader from "@/components/admin/properties/PropertiesHeader";
import PropertiesList from "@/components/admin/properties/PropertiesList";
import PropertiesDashboardMap from "@/components/admin/properties/PropertiesDashboardMap";
import { useProperties } from "@/app/admin/hooks/useAdminData";
import EmptySlate from "@/components/main/EmptySlate";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

export default function PropertiesDashboard() {
  const { data, isLoading, isError, error } = useProperties();
  const [properties, setProperties] = useState<IProperty[]>(
    Array.isArray(data) ? data : [],
  );
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState<
    IProperty["propertyType"] | "all"
  >("all");
  const [status, setStatus] = useState<IProperty["status"] | "all">("all");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null,
  );

  // Sync local state when data changes (initial load / refetch)
  useMemo(() => {
    if (Array.isArray(data)) setProperties(data);
  }, [data]);

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

  const handleDeleteProperty = async (id: string) => {
    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Delete failed");

      toast.success("Property deleted!");
      // Remove property from local state
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      toast.error(err.message || "Failed to delete property");
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader size={50} color="#7c3aed" />
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-screen">
        <EmptySlate
          title="Failed to load properties"
          subtitle={
            (error as Error)?.message || "An unexpected error occurred."
          }
        />
      </div>
    );

  // Check if there are no properties or filtered results
  const hasNoProperties = properties.length === 0;
  const hasNoResults = filteredProperties.length === 0 && properties.length > 0;

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
        addNew={true}
      />

      <div className="flex flex-1 gap-0">
        <div className="flex-1 xl:-mr-5">
          {hasNoProperties ? (
            <EmptySlate
              title="No properties found"
              subtitle="You have not added any properties yet."
            />
          ) : hasNoResults ? (
            <EmptySlate
              title="No results"
              subtitle="No properties match your search/filter criteria."
            />
          ) : (
            <PropertiesList
              view={view}
              properties={filteredProperties}
              onSelectProperty={setSelectedPropertyId}
              onDeleteProperty={handleDeleteProperty}
            />
          )}
        </div>

        {!hasNoProperties && !hasNoResults && (
          <div className="px-5 hidden 2xl:block z-0">
            <div className="rounded-lg overflow-hidden w-1/3 min-w-120 h-full flex-1">
              <PropertiesDashboardMap
                properties={filteredProperties}
                selectedPropertyId={selectedPropertyId}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}