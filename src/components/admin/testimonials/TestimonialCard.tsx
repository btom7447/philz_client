"use client";

import { FC, useState, useEffect } from "react";
import { Edit, Trash2, Star, Clock } from "lucide-react";
import { ITestimonial } from "@/app/types/Testimonial";
import { optimizeCloudinary } from "@/app/utils/optimizeCloudinary";
import { ClipLoader } from "react-spinners";

interface Props {
  testimonial: ITestimonial;
  onEdit?: (t: ITestimonial) => void;
  onDelete?: (t: ITestimonial) => void;
  onToggleApprove?: (t: ITestimonial, approved: boolean) => void;
  view: "grid" | "list";
  collapsed?: boolean;
}

const TestimonialCard: FC<Props> = ({
  testimonial,
  onEdit,
  onDelete,
  onToggleApprove,
  view,
  collapsed,
}) => {
  const hasImage = testimonial.images && testimonial.images.length > 0;
  const [isApproved, setIsApproved] = useState(testimonial.approved);
  const [isDeleting, setIsDeleting] = useState(false);

  // Update local state if testimonial prop changes
  useEffect(() => {
    setIsApproved(testimonial.approved);
  }, [testimonial.approved]);

  // Stars array
  const stars = Array.from({ length: 5 }, (_, i) => i < testimonial.rating);

  const handleToggleApprove = async () => {
    const newStatus = !isApproved;

    try {
      await onToggleApprove?.(testimonial, newStatus);
      setIsApproved(newStatus); // Only update after success
    } catch (err) {
      console.error("Failed to toggle approval", err);
      // Optionally show a toast or revert UI
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer
        ${view === "list" ? "flex flex-row" : "flex flex-col"}`}
    >
      {/* IMAGE */}
      {hasImage && (
        <div
          className={`relative ${
            view === "list" ? "w-1/3 h-60" : "w-full h-60"
          }`}
        >
          <img
            src={
              testimonial.images?.[0]?.url
                ? optimizeCloudinary(testimonial.images[0].url, 600)
                : "/placeholder-property.jpg"
            }
            alt={testimonial.name}
            className="w-full h-full object-cover object-top"
          />

          <div className="absolute inset-0 bg-black/30"></div>

          {/* Stars top-left */}
          <div className="absolute top-2 left-2 flex items-center gap-1">
            {stars.map((filled, idx) => (
              <Star
                key={idx}
                className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>

          {/* Status pill top-right */}
          <div
            className="absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-medium text-white shadow-sm"
            style={{
              backgroundColor: isApproved ? "#7c3aed" : "#ef4444", // purple-700 or red
            }}
          >
            {isApproved ? "Approved" : "Pending"}
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div
        className={`p-4 flex flex-col gap-2 ${
          view === "list" ? "w-2/3 h-60" : "w-full flex-1"
        }`}
      >
        {/* Text */}
        <p className="text-gray-700 border-b border-gray-300 text-md pb-5 line-clamp-3">
          {testimonial.content}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-start mt-2 flex-1 flex-col">
          {/* Left info */}
          <div className="flex flex-col text-gray-600 text-sm mb-3">
            <p className="font-extralight text-lg">{testimonial.name}</p>
            <p className="font-semibold text-md">{testimonial.title}</p>
            <p className="flex items-center gap-1">
              <Clock size={15} strokeWidth={1} className="text-gray-500" />
              Submitted:{" "}
              {new Date(testimonial.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Right actions */}
          <div
            className={`flex gap-4 mt-2 flex-wrap items-center ${
              view === "list" ? "flex-row" : "flex-row justify-end"
            }`}
          >
            {/* Approve toggle using Uiverse switch */}
            <label className="approve-switch">
              <input
                type="checkbox"
                checked={isApproved}
                onChange={handleToggleApprove}
              />
              <span className="slider"></span>
            </label>

            {/* Edit */}
            {onEdit && (
              <button
                onClick={() => onEdit(testimonial)}
                className="cursor-pointer flex items-center gap-1 px-5 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-purple-100 transition"
              >
                <Edit size={18} strokeWidth={1} /> Edit
              </button>
            )}

            {/* Delete */}
            {onDelete && (
              <button
                onClick={async () => {
                  setIsDeleting(true);
                  try {
                    await onDelete(testimonial);
                  } catch (err) {
                    console.error("Failed to delete testimonial", err);
                  } finally {
                    setIsDeleting(false);
                  }
                }}
                disabled={isDeleting}
                className="cursor-pointer flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-red-100 transition"
              >
                {isDeleting ? (
                  <ClipLoader size={18} color="#ef4444" /> // red loader
                ) : (
                  <>
                    <Trash2 size={18} strokeWidth={1} /> Delete
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;