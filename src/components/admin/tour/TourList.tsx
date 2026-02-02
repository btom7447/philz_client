"use client";

import { FC, useMemo, useState } from "react";
import { ITourRequestPopulated } from "@/app/types/Tour";
import TourCard from "./TourCard";
import ConfirmModal from "@/components/main/ConfirmModal";

interface Props {
  view: "grid" | "list";
  tours: ITourRequestPopulated[];
  onEditTour: (tour: ITourRequestPopulated) => void;
  onCancelTour: (id: string) => void;
  pageSize?: number;
  onToggleApprove?: (tour: ITourRequestPopulated, approved: boolean) => void;
}

const TourList: FC<Props> = ({
  view,
  tours,
  onEditTour,
  onCancelTour,
  onToggleApprove,
  pageSize = 6,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const totalPages = Math.ceil(tours.length / pageSize);

  const paginatedTours = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return tours.slice(start, start + pageSize);
  }, [tours, currentPage, pageSize]);

  if (!tours.length) {
    return (
      <div className="p-10 text-center text-gray-600">
        No tour requests found.
      </div>
    );
  }

  return (
    <>
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            : "grid grid-cols-1 lg:grid-cols-2 gap-4"
        }
      >
        {paginatedTours.map((tour) => (
          <TourCard
            key={tour._id}
            tour={tour}
            view={view}
            onEdit={() => onEditTour(tour)}
            onCancel={() => setCancelId(tour._id)}
            onToggleApprove={onToggleApprove}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-purple-700 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
      <ConfirmModal
        isOpen={!!cancelId}
        message="Are you sure you want to cancel this tour? This action cannot be undone."
        onCancel={() => setCancelId(null)}
        onConfirm={async () => {
          if (!cancelId) return;
          setIsCancelling(true);

          try {
            await onCancelTour(cancelId);
            setCancelId(null);
          } catch (err: any) {
            console.error(err);
          } finally {
            setIsCancelling(false);
          }
        }}
        isLoading={isCancelling}
      />
    </>
  );
};

export default TourList;