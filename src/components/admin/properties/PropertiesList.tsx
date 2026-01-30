"use client";

import { FC, useEffect, useMemo, useState } from "react";
import PropertyCard from "./PropertyCard";
import Pagination from "./Pagination";
import { IProperty } from "@/app/types/Properties";
import { toast } from "sonner";
import ConfirmModal from "@/components/main/ConfirmModal";

interface Props {
  view: "grid" | "list";
  properties: IProperty[];
  onSelectProperty: (id: string) => void;
  onDeleteProperty?: (id: string) => void;
  pageSize?: number;
}

const PropertiesList: FC<Props> = ({
  view,
  properties,
  onSelectProperty,
  onDeleteProperty,
  pageSize = 6,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Sidebar state
  useEffect(() => {
    const saved = localStorage.getItem("admin_sidebar_collapsed");
    if (saved !== null) setCollapsed(saved === "true");
  }, []);

  const totalPages = Math.ceil(properties.length / pageSize);

  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return properties.slice(start, start + pageSize);
  }, [properties, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId || !onDeleteProperty) return;

    setIsDeleting(true);
    await onDeleteProperty(deleteId);
    setIsDeleting(false);
    setDeleteId(null);
  };

  return (
    <>
      {/* PROPERTY GRID */}
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-5"
            : "grid grid-cols-1 3xl:grid-cols-2 gap-4 px-5"
        }
      >
        {paginatedProperties.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            view={view}
            collapsed={collapsed}
            onSelect={onSelectProperty}
            onDelete={() => handleDelete(property._id)}
          />
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={properties.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      )}
      <ConfirmModal
        isOpen={!!deleteId}
        message="Are you sure you want to delete this property? This action cannot be undone."
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
      />
    </>
  );
};

export default PropertiesList;