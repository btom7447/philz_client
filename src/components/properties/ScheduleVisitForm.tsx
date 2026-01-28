"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { IProperty } from "@/app/types/Properties";
import FormInput from "../admin/main/FormInput";
import FormTextarea from "../admin/main/FormTextarea";
import TourTypeToggle from "./TourTypeToggle";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "sonner";
import FormDateInput from "../admin/main/FormDateInput";
import { useAuthStore } from "@/app/store/useAuthStore";
import { Lock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  property: IProperty;
}

export interface TourFormValues {
  name: string;
  email: string;
  phone: string;
  tourType: "virtual" | "in-person";
  tourTime: string; // ISO string
  message: string;
  propertyId: string;
}

export const PropertyScheduleVisit: FC<Props> = ({ property }) => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TourFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      tourType: "in-person",
      tourTime: "",
      message: `Hello, I am interested in the ${property.title}`,
    },
  });

  const { register, handleSubmit, reset, setValue, watch } = form;

  const tourType = watch("tourType"); // fully controlled by RHF

  const handleToggle = (type: "virtual" | "in-person") => {
    setValue("tourType", type); // only update RHF value
  };

  const onSubmit = async (data: TourFormValues) => {
    setIsSubmitting(true);
    try {
      if (!data.tourTime) throw new Error("Please select a date and time");

      const payload = {
        propertyId: property._id,
        tourType: data.tourType,
        tourTime: data.tourTime,
      };

      const res = await fetch("/api/tours/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to request tour");

      toast.success("Tour requested successfully!");

      // Reset all fields, including tourType and date
      reset({
        name: "",
        email: "",
        phone: "",
        tourType: "in-person",
        tourTime: "",
        message: `Hello, I am interested in the ${property.title}`,
      });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full p-5 bg-white shadow-lg rounded-lg relative">
      <div className="border-l-2 border-purple-700 px-5 py-2 mb-5">
        <h2 className="text-3xl font-semibold">Schedule a Visit</h2>
      </div>

      {/* Overlay if user not logged in */}
      {!user && (
        <div className="absolute inset-0 backdrop-blur-xs bg-white/30 z-10 flex flex-col items-center justify-center gap-4 rounded-lg p-5 border border-purple-700">
          <Lock size={40} className="text-purple-700" strokeWidth={1} />
          <p className="text-lg text-gray-700 text-center">
            You must be logged in to schedule a visit.
          </p>
          <button
            onClick={() =>
              router.push(`/login?next=${encodeURIComponent(pathname)}`)
            }
            className="bg-purple-700 text-white font-roboto text-xl px-10 py-4 rounded-lg hover:bg-purple-800 transition cursor-pointer"
          >
            Login
          </button>
        </div>
      )}

      <form
        className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 mt-5 ${
          !user ? "pointer-events-none opacity-50" : ""
        }`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="self-center mx-auto mb-5 md:col-span-2 xl:col-span-1">
          <TourTypeToggle tourType={tourType} setTourType={handleToggle} />
        </div>

        <FormInput label="Name" {...register("name")} />
        <FormInput label="Email" type="email" {...register("email")} />
        <FormInput label="Phone" type="tel" {...register("phone")} />

        <FormDateInput
          label="Preferred Date & Time"
          value={watch("tourTime")}
          onChange={(val) => setValue("tourTime", val)}
        />

        <div className="md:col-span-2 xl:col-span-1">
          <FormTextarea label="Message" {...register("message")} />
        </div>

        <button
          type="submit"
          className="mt-5 md:col-span-2 xl:col-span-1 bg-purple-700 text-white font-roboto text-xl px-10 py-4 rounded-lg hover:bg-purple-800 transition flex items-center justify-center gap-2 disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting && <ClipLoader size={20} color="#fff" />}
          Send Request
        </button>
      </form>
    </section>
  );
};