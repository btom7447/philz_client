"use client";

import { useState } from "react";
import { toast } from "sonner";

interface Props {
  mode: "create" | "edit";
  propertyId?: string;
}

export const usePropertyFormSubmit = ({ mode, propertyId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        mode === "create" ? "/api/properties" : `/api/properties/${propertyId}`,
        { method: mode === "create" ? "POST" : "PATCH", body: formData },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(
        `Property ${mode === "create" ? "created" : "updated"} successfully`,
      );
      return data;
    } catch (err: any) {
      toast.error(err.message || "Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading };
};