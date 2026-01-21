"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

interface Props {
  onClick?: () => void;
}

const AddPropertyButton: FC<Props> = ({ onClick }) => {
  return (
    <Link href="/admin/properties/new"
      onClick={onClick}
      className="flex items-center gap-2 bg-purple-700 text-white font-roboto text-xl px-6 py-3 rounded-lg hover:bg-purple-800 transition cursor-pointer"
    >
      <Plus size={16} />
      Add Property
    </Link>
  );
};

export default AddPropertyButton;