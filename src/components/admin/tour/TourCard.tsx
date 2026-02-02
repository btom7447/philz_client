"use client";

import { FC, useState, useEffect } from "react";
import { SquarePen, XCircle } from "lucide-react";
import { ITourRequestPopulated } from "@/app/types/Tour";
import { ClipLoader } from "react-spinners";
import { optimizeCloudinary } from "@/app/utils/optimizeCloudinary";

interface Props {
  tour: ITourRequestPopulated;
  view: "grid" | "list";
  onEdit: () => void;
  onCancel: () => void;
  onToggleApprove?: (tour: ITourRequestPopulated, approved: boolean) => void;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  canceled: "bg-gray-200 text-gray-600",
};

const TourCard: FC<Props> = ({
  tour,
  view,
  onEdit,
  onCancel,
  onToggleApprove,
}) => {
  const [status, setStatus] = useState(tour.status);
  const [isApproving, setIsApproving] = useState(false);

  useEffect(() => {
    setStatus(tour.status);
  }, [tour.status]);

  const handleToggleApprove = async () => {
    if (!onToggleApprove) return;
    setIsApproving(true);
    const newStatus = status === "approved" ? "rejected" : "approved";
    try {
      await onToggleApprove(tour, newStatus === "approved");
      setStatus(newStatus);
    } catch (err) {
      console.error(err);
    } finally {
      setIsApproving(false);
    }
  };

  const imageUrl =
    tour.propertyId?.images?.[0]?.url || "/placeholder-property.jpg";

  return (
    <div
      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden ${
        view === "list" ? "flex gap-4 h-60" : "flex flex-col"
      }`}
    >
      {/* IMAGE */}
      {imageUrl && (
        <div
          className={`flex-shrink-0 relative ${
            view === "list" ? "w-1/3 h-full" : "w-full h-48"
          } relative`}
        >
          <img
            src={optimizeCloudinary(
              tour.propertyId?.images?.[0]?.url || "/placeholder-property.jpg",
              600,
            )}
            alt={tour.propertyId?.title || "Property Image"}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <span
            className={`absolute top-2 left-2  px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}
          >
            {status}
          </span>
        </div>
      )}

      {/* CONTENT */}
      <div
        className={`p-5 flex flex-col justify-between flex-1 ${
          view === "list" ? "h-full" : ""
        }`}
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg truncate">
              {tour.propertyId?.title}
            </h3>
          </div>

          <p className="text-sm text-gray-600">
            {tour.type === "virtual" ? "Virtual Tour" : "In-Person Tour"}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(tour.tourTime).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Requested by {tour.userId?.name}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 mt-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onEdit}
              className="flex items-center gap-1 px-4 py-1.5 rounded-lg border border-purple-500 text-purple-600 hover:bg-purple-50"
            >
              <SquarePen size={16} /> Edit
            </button>
            {status !== "canceled" && (
              <button
                onClick={onCancel}
                className="flex items-center gap-1 px-4 py-1.5 rounded-lg border border-red-500 text-red-600 hover:bg-red-50"
              >
                <XCircle size={16} /> Cancel
              </button>
            )}
          </div>
          {/* Approve toggle using Uiverse switch */}{" "}
          <label className="approve-switch">
            {" "}
            <input
              type="checkbox"
              checked={isApproving}
              onChange={handleToggleApprove}
            />{" "}
            <span className="slider"></span>{" "}
          </label>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
