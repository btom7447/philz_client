"use client";

import { FC, useEffect, useState } from "react";
import Modal from "react-modal";
import FormInput from "../main/FormInput";
import FormTextarea from "../main/FormTextarea";
import FileUploadInput, { UploadFile } from "../main/FileUploadInput";
import { ITestimonial } from "@/app/types/Testimonial";
import { toast } from "sonner";
import FormCheckbox from "../main/FormCheckbox";
import { Save, SendHorizonal, StepForward } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";
import ModalFormSelect from "../main/ModalFormSelect";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  testimonial?: ITestimonial;
  onSaved?: () => void;
}

const TestimonialFormModal: FC<Props> = ({
  isOpen,
  onClose,
  testimonial,
  onSaved,
}) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [approved, setApproved] = useState(false);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") Modal.setAppElement("body");
  }, []);

  // Prefill state when editing
  useEffect(() => {
    if (testimonial) {
      setName(testimonial.name);
      setTitle(testimonial.title);
      setContent(testimonial.content);
      setRating(testimonial.rating);
      setApproved(testimonial.approved);

      setFiles(
        testimonial.images.map((img) => ({
          file: null,
          url: img.url,
          public_id: img.public_id,
          type: "image",
        })),
      );
    } else {
      setName("");
      setTitle("");
      setContent("");
      setRating(5);
      setApproved(false);
      setFiles([]);
    }
  }, [testimonial]);

    const handleSubmit = async () => {
      setLoading(true);

      try {
        // 1️⃣ Determine testimonialId (existing or new)
        const testimonialId = testimonial?._id ?? crypto.randomUUID();

        // 2️⃣ Upload only new images
        const newFiles = files.filter((f) => f.file !== null);
        let uploadedImages: UploadFile[] = [];

        if (newFiles.length > 0) {
          const formData = new FormData();
          formData.append("testimonialId", testimonialId);

          newFiles.forEach((f) => {
            if (f.file) formData.append("images", f.file);
          });

          const uploadRes = await fetch("/api/uploads/testimonial", {
            method: "POST",
            body: formData,
          });

          if (!uploadRes.ok) throw new Error("Image upload failed");

          const { files: uploaded } = await uploadRes.json();
          uploadedImages = uploaded;
        }

        // 3️⃣ Merge existing images + newly uploaded
        const finalImages = [
          ...files.filter((f) => f.file === null),
          ...uploadedImages,
        ];

        // 4️⃣ Build payload
        const payload = {
          _id: testimonialId,
          name,
          title,
          content,
          rating,
          approved,
          images: finalImages,
        };

        // 5️⃣ Submit to backend
        const res = await fetch(
          testimonial
            ? `/api/testimonials/${testimonialId}`
            : "/api/testimonials",
          {
            method: testimonial ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Submission failed");

        toast.success(
          `Testimonial ${testimonial ? "updated" : "created"} successfully`,
        );

        onSaved?.();
        onClose();

        // 6️⃣ Clear form state only if it was a new testimonial
        if (!testimonial) {
          setName("");
          setTitle("");
          setContent("");
          setRating(5);
          setApproved(false);
          setFiles([]);
        }
      } catch (err: any) {
        console.error("Form submission error:", err);
        toast.error(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel={testimonial ? "Edit Testimonial" : "Create Testimonial"}
      overlayClassName="fixed inset-0 bg-black/50 z-50 flex justify-center items-start pt-10 overflow-y-auto"
      className="bg-white rounded-lg w-full max-w-3xl p-6 outline-none shadow-lg max-h-[90vh] overflow-y-auto"
    >
      <h2 className="text-2xl font-bold mb-4">
        {testimonial ? "Edit Testimonial" : "Create Testimonial"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* File upload */}
        <div className="col-span-1 md:col-span-2">
          <FileUploadInput
            files={files}
            setFiles={setFiles}
            mode="image"
            label="Images"
          />
        </div>

        <FormInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <ModalFormSelect
          label="Rating"
          value={String(rating)}
          onChange={(v) => setRating(Number(v))}
          options={[
            { value: "1", label: "1 Star" },
            { value: "2", label: "2 Stars" },
            { value: "3", label: "3 Stars" },
            { value: "4", label: "4 Stars" },
            { value: "5", label: "5 Stars" },
          ]}
        />

        <div className="col-span-1 md:col-span-2 flex items-center gap-2 my-3">
          <FormCheckbox
            label="Approved"
            checked={approved}
            onChange={setApproved}
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <FormTextarea
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="col-span-1 md:col-span-2 flex justify-start gap-3 mt-4">
          <button
            onClick={onClose}
            disabled={loading}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition disabled:opacity-50`}
          >
            <Save className="w-5 h-5" /> Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg transition
              ${loading ? "bg-purple-200 text-purple-700 border border-purple-600 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-800 text-white"}
            `}
          >
            {loading && <ClipLoader size={18} color="#fff" />}
            {loading
              ? testimonial
                ? "Updating"
                : "Creating"
              : testimonial
                ? "Update"
                : "Create"}
            <SendHorizonal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TestimonialFormModal;