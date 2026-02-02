"use client";

import { useState, useMemo, useEffect } from "react";
import TourHeader from "./TourHeader";
import TourList from "./TourList";
import { useTours } from "@/app/admin/hooks/useAdminData";
import { ITourRequestPopulated } from "@/app/types/Tour";
import EmptySlate from "@/components/main/EmptySlate";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import TourRescheduleModal from "./TourRescheduleModal";

export default function TourDashboard() {
  const { data, isLoading, isError, error } = useTours();

  const [tours, setTours] = useState<ITourRequestPopulated[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [tourType, setTourType] = useState<"all" | "in-person" | "virtual">(
    "all",
  );
  const [editingTour, setEditingTour] =
  useState<ITourRequestPopulated | null>(null);

  useEffect(() => {
    if (data?.data) {
      setTours(data.data);
    }
  }, [data]);

  const filteredTours = useMemo(() => {
    return tours.filter((t) => {
      if (!t.propertyId || !t.userId) return false;

      const q = searchQuery.toLowerCase();

      const matchesSearch =
        t.propertyId.title.toLowerCase().includes(q) ||
        t.userId.name.toLowerCase().includes(q) ||
        t.userId.email.toLowerCase().includes(q);

      const matchesType = tourType === "all" || t.type === tourType;

      return matchesSearch && matchesType;
    });
  }, [tours, searchQuery, tourType]);

  const handleDeleteTour = async (id: string) => {
    try {
      const res = await fetch(`/api/tours/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      toast.success("Tour request deleted!");
      setTours((prev) => prev.filter((t) => t._id !== id));
    } catch (err: any) {
      toast.error(err.message || "Failed to delete tour request");
    }
  };

  const handleToggleApproveTour = async (
    tour: ITourRequestPopulated,
    approved: boolean,
  ) => {
    try {
      const res = await fetch(`/api/tours/${tour._id}/approve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: approved ? "approved" : "rejected" }),
      });
      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message || "Failed to update tour status");

      setTours((prev) =>
        prev.map((t) =>
          t._id === tour._id
            ? { ...t, status: approved ? "approved" : "rejected" }
            : t,
        ),
      );
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to update tour status");
    }
  };

  const handleCancelTour = async (id: string) => {
    if (!id) return; // safeguard
    try {
      const res = await fetch(`/api/tours/${id}/cancel`, { method: "PATCH" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Cancel failed");

      toast.success("Tour cancelled");

      setTours((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: "canceled" } : t)),
      );
    } catch (err: any) {
      toast.error(err.message || "Failed to cancel tour");
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
          title="Failed to load tour requests"
          subtitle={
            (error as Error)?.message || "An unexpected error occurred."
          }
        />
      </div>
    );

  const hasNoTours = tours.length === 0;
  const hasNoResults = filteredTours.length === 0 && tours.length > 0;

  return (
    <div className="bg-purple-50 flex flex-col h-full gap-5">
      <TourHeader
        view={view}
        setView={setView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        tourType={tourType}
        setTourType={setTourType}
      />

      <div className="flex flex-1 gap-0">
        <div className="flex-1">
          {hasNoTours ? (
            <EmptySlate
              title="No tour requests"
              subtitle="You have not received any tour requests yet."
            />
          ) : hasNoResults ? (
            <EmptySlate
              title="No results"
              subtitle="No tour requests match your search/filter criteria."
            />
          ) : (
            <TourList
              view={view}
              tours={filteredTours}
              onEditTour={setEditingTour}
              onCancelTour={handleCancelTour}
              onToggleApprove={handleToggleApproveTour}
            />
          )}
        </div>
      </div>
      {editingTour && (
        <TourRescheduleModal
          isOpen={!!editingTour}
          tour={editingTour}
          onClose={() => setEditingTour(null)}
          onSaved={(updatedTour) => {
            setTours((prev) =>
              prev.map((t) => (t._id === updatedTour._id ? updatedTour : t)),
            );
            setEditingTour(null);
          }}
        />
      )}
    </div>
  );
}
