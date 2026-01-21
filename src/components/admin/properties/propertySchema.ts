import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  propertyType: z.enum(["apartment", "house", "office", "shop"]),
  featured: z.boolean(),
  yearBuilt: z.number().int().positive(),
  price: z.number().positive(),
  status: z.enum(["for sale", "for rent"]),
  sold: z.boolean(),
  area: z.number().positive().optional(),
  bedrooms: z.number().int().nonnegative().optional(),
  bathrooms: z.number().int().nonnegative().optional(),
  toilets: z.number().int().nonnegative().optional(),
  garages: z.number().int().nonnegative().optional(),
  address: z.object({
    city: z.string().min(2),
    state: z.string().min(2),
  }),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  amenities: z.array(z.string()).optional(),
  additionalDetails: z.string().optional(),
  images: z
    .array(
      z.object({
        url: z.string(),
        public_id: z.string().optional(),
      }),
    )
    .optional(),
  videos: z
    .array(
      z.object({
        url: z.string(),
        public_id: z.string().optional(),
      }),
    )
    .optional(),
  floorPlans: z
    .array(
      z.object({
        url: z.string(),
        public_id: z.string().optional(),
      }),
    )
    .optional(),
});

export type IPropertyFormValues = z.infer<typeof propertySchema>;