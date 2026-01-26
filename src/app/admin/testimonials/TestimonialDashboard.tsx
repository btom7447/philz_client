"use client";

import { useMemo, useState } from "react";
import { useTestimonials } from "@/app/admin/hooks/useAdminData";
import EmptySlate from "@/components/main/EmptySlate";
import { ClipLoader } from "react-spinners";
import TestimonialsHeader from "@/components/admin/testimonials/TestimonialHeader";
import TestimonialsList from "@/components/admin/testimonials/TestimonialList";
import TestimonialFormModal from "@/components/admin/testimonials/TestimonialFormModal";
import { ITestimonial } from "@/app/types/Testimonial";
import { toast } from "sonner";

export default function TestimonialDashboard() {
  const { data = [], isLoading, isError, error, refetch } = useTestimonials();
  const testimonials: ITestimonial[] = Array.isArray(data) ? data : [];

  const [searchQuery, setSearchQuery] = useState("");
  const [rating, setRating] = useState<number | "all">("all");
  const [approved, setApproved] = useState<boolean | "all">("all");
  const [view, setView] = useState<"grid" | "list">("grid"); // NEW
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<
    ITestimonial | undefined
  >(undefined);

  const openCreateModal = () => {
    setEditingTestimonial(undefined);
    setModalOpen(true);
  };

  const openEditModal = (t: ITestimonial) => {
    setEditingTestimonial(t);
    setModalOpen(true);
  };

 const handleDelete = async (testimonial: ITestimonial) => {
   try {
     const res = await fetch(`/api/testimonials/${testimonial._id}`, {
       method: "DELETE",
     });

     if (!res.ok) throw new Error("Failed to delete testimonial");

     toast.success("Testimonial deleted successfully");
     refetch?.(); // refresh the list
   } catch (err: any) {
     console.error(err);
     toast.error(err?.message || "Failed to delete testimonial");
   }
 };

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRating = rating === "all" || t.rating === rating;
      const matchesApproved = approved === "all" || t.approved === approved;
      return matchesSearch && matchesRating && matchesApproved;
    });
  }, [testimonials, searchQuery, rating, approved]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader size={50} color="#7c3aed" />
      </div>
    );
  if (isError)
    return (
      <EmptySlate
        title="Failed to load testimonials"
        subtitle={(error as Error)?.message || "An unexpected error occurred"}
      />
    );

  const hasNoTestimonials = testimonials.length === 0;
  const hasNoResults =
    filteredTestimonials.length === 0 && testimonials.length > 0;

  return (
    <div className="bg-purple-50 flex flex-col h-full gap-5">
      <TestimonialsHeader
        view={view}
        setView={setView} // NEW
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        rating={rating}
        setRating={setRating}
        approved={approved}
        setApproved={setApproved}
        onAddClick={openCreateModal}
      />

      <div className="flex-1">
        {hasNoTestimonials ? (
          <EmptySlate
            title="No testimonials yet"
            subtitle="Client testimonials will appear here once added."
          />
        ) : hasNoResults ? (
          <EmptySlate
            title="No results"
            subtitle="No testimonials match your filters."
          />
        ) : (
          <TestimonialsList
            testimonials={filteredTestimonials}
            onEdit={openEditModal}
            view={view} 
            onDelete={handleDelete}
          />
        )}
      </div>

      <TestimonialFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        testimonial={editingTestimonial}
        onSaved={() => refetch?.()}
      />
    </div>
  );
}