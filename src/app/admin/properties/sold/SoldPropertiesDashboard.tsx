"use client";

import { useMemo, useState } from "react";
import PropertiesHeader from "@/components/admin/properties/PropertiesHeader";
import { IProperty } from "@/app/types/Properties";
import PropertiesList from "@/components/admin/properties/PropertiesList";
import PropertiesDashboardMap from "@/components/admin/properties/PropertiesDashboardMap";
import { useProperties } from "@/app/admin/hooks/useAdminData";
import EmptySlate from "@/components/main/EmptySlate";
import { ClipLoader } from "react-spinners";

export default function SoldPropertiesDashboard() {
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

  /** 🔎 Only sold properties + filter/search */
  const soldProperties = useMemo(
    () => properties.filter((p) => p.sold),
    [properties],
  );

  const filteredProperties = useMemo(() => {
    return soldProperties.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.state.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        propertyType === "all" || p.propertyType === propertyType;
      const matchesStatus = status === "all" || p.status === status;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [soldProperties, searchQuery, propertyType, status]);

if (isLoading)
  return (
    <div className="flex items-center justify-center h-screen">
      <ClipLoader size={50} color="#7c3aed" />
    </div>
  );
  // Cases
  const hasNoSoldProperties = soldProperties.length === 0;
  const hasNoFilteredResults =
    filteredProperties.length === 0 && soldProperties.length > 0;

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
        addNew={false}
      />

      <div className="flex flex-1 gap-0">
        <div className="flex-1 xl:-mr-5">
          {hasNoSoldProperties ? (
            <EmptySlate
              title="No Sold Properties"
              subtitle="There are currently no sold properties."
            />
          ) : hasNoFilteredResults ? (
            <EmptySlate
              title="No Results"
              subtitle="No sold properties match your search or filters."
            />
          ) : (
            <PropertiesList
              view={view}
              properties={filteredProperties}
              onSelectProperty={setSelectedPropertyId}
            />
          )}
        </div>

        {!hasNoSoldProperties && !hasNoFilteredResults && (
          <div className="px-5 hidden 2xl:block">
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
