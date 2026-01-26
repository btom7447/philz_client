"use client";

import { FC } from "react";
import { Plus } from "lucide-react";

interface Props {
  onClick?: () => void;
}

const AddTestimonialButton: FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 bg-purple-700 text-white font-roboto text-xl px-6 py-3 rounded-lg hover:bg-purple-800 transition"
    >
      <Plus size={16} />
      Create Testimonial
    </button>
  );
};

export default AddTestimonialButton;