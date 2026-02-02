import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/app/lib/fetcher";
import { IProperty } from "@/app/types/Properties";
import { ITestimonial } from "@/app/types/Testimonial";
import { ITourRequestPopulated } from "@/app/types/Tour";

// -------------------- PROPERTIES --------------------
export function useProperties() {
  return useQuery<IProperty[]>({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await fetcher("/api/properties");
      // extract the array from the response
      return res.properties;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

// -------------------- TESTIMONIALS --------------------
export function useTestimonials() {
  return useQuery<ITestimonial[]>({
    queryKey: ["admin-testimonials"],
    queryFn: () => fetcher("/api/testimonials?admin=true"),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

// -------------------- TOURS --------------------

export function useTours() {
  return useQuery<{
    data: ITourRequestPopulated[];
    meta: { page: number; limit: number; total: number };
  }>({
    queryKey: ["tours"],
    queryFn: async () => {
      const res = await fetcher("/api/tours");
      return res;
    },
    staleTime: 5 * 60 * 1000,
  });
}
// -------------------- INQUIRIES --------------------
export function useInquiries() {
  return useQuery({
    queryKey: ["inquiries"],
    queryFn: () => fetcher("/api/inquiries"),
    staleTime: 5 * 60 * 1000,
  });
}

// -------------------- URGENT ITEMS --------------------
export function useUrgentItems() {
  return useQuery({
    queryKey: ["urgent-items"],
    queryFn: () => fetcher("/api/tours?urgent=true"),
    staleTime: 2 * 60 * 1000,
  });
}