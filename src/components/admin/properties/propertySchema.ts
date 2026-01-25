import { z } from "zod";

export const propertyFormSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),

  propertyType: z.enum(["apartment", "house", "office", "shop"]),

  featured: z.enum(["true", "false"]),
  sold: z.enum(["true", "false"]),

  yearBuilt: z.string(),
  price: z.string(),

  status: z.enum(["for sale", "for rent"]),

  area: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  toilets: z.string().optional(),
  garages: z.string().optional(),

  address: z.object({
    city: z.string().min(2),
    state: z.string().min(2),
  }),

  location: z.object({
    latitude: z.string(),
    longitude: z.string(),
  }),

  amenities: z.array(z.string()).optional(),
  additionalDetails: z.string().optional(),
});

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;