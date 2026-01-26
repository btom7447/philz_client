"use client";

import { FC, useState, useEffect } from "react";
import { ITestimonial } from "@/app/types/Testimonial";
import TestimonialCard from "./TestimonialCard";

interface Props {
  testimonials: ITestimonial[];
  onEdit?: (t: ITestimonial) => void;
  view: "grid" | "list";
  onDelete?: (t: ITestimonial) => void;
}

const TestimonialsList: FC<Props> = ({ testimonials, onEdit, onDelete, view }) => {
  const [collapsed, setCollapsed] = useState(false);

  // Optional: fetch sidebar collapsed state (like PropertiesList)
  useEffect(() => {
    const saved = localStorage.getItem("admin_sidebar_collapsed");
    if (saved !== null) {
      setCollapsed(saved === "true");
    }
  }, []);

  // Toggle Approve
  const handleToggleApprove = async (
    testimonial: ITestimonial,
    approved: boolean,
  ) => {
    try {
      const res = await fetch(`/api/testimonials/${testimonial._id}/approve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to toggle approval");
      }
    } catch (err: any) {
      console.error("Failed to toggle approval", err);
      // Optionally revert optimistic UI
    }
  };

  return (
    <div
      className={
        view === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          : "grid grid-cols-1 xl:grid-cols-2 gap-4"
      }
    >
      {testimonials.map((t) => (
        <TestimonialCard
          key={t._id}
          testimonial={t}
          onEdit={onEdit}
          onDelete={onDelete}
          view={view}
          collapsed={collapsed}
          onToggleApprove={handleToggleApprove}
        />
      ))}
    </div>
  );
};;

export default TestimonialsList;