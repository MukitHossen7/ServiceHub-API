import z from "zod";

export const createServiceZodSchema = z.object({
  name: z.string().min(2, "Service name must be at least 2 characters"),
  slug: z.string().optional(),
  description: z.string().min(5, "Description must be at least 5 characters"),
  images: z.array(z.string()).optional(),
  includedServices: z.array(z.string()).optional(),
  excludedServices: z.array(z.string()).optional(),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  duration: z.string().optional(),
});

export const updateServiceZodSchema = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  includedServices: z.array(z.string()).optional(),
  excludedServices: z.array(z.string()).optional(),
  price: z.number().min(0).optional(),
  duration: z.string().optional(),
});
