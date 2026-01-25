import { z } from "zod";

export const propertyDomainSchema = z.object({
  title: z.string(),
  description: z.string(),

  propertyType: z.enum(["apartment", "house", "office", "shop"]),

  featured: z.boolean(),
  sold: z.boolean(),

  yearBuilt: z.number().int().positive(),
  price: z.number().positive(),

  status: z.enum(["for sale", "for rent"]),

  area: z.number().optional(),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  toilets: z.number().optional(),
  garages: z.number().optional(),

  address: z.object({
    city: z.string(),
    state: z.string(),
  }),

  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),

  amenities: z.array(z.string()).optional(),
  additionalDetails: z.string().optional(),
});

export type PropertyDomainValues = z.infer<typeof propertyDomainSchema>;