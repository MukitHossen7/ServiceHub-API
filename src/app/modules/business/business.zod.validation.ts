import z from "zod";

export const businessAddressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().optional(),
  country: z.string().min(1, "Country is required"),
});

export const createBusinessZodSchema = z.object({
  user: z.string().optional(),
  businessName: z.string().min(1, "Business name is required"),
  businessAddress: businessAddressSchema,
  zipCode: z.string().min(1, "Zip code is required"),
  businessPhone: z
    .string({ invalid_type_error: "Phone Number must be string" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    }),
  website: z.string().url().optional(),
  businessLogo: z.string().url().optional(),
  socialLinks: z.array(z.string().url()).optional().default([]),
  yearsInBusiness: z.number().min(0, "Years in business must be positive"),
  numberOfLocations: z.number().optional(),
  description: z.string().min(1, "Description is required"),
  images: z.array(z.string().url()).optional().default([]),
});

export const updateBusinessZodSchema = z.object({
  user: z.string().optional(),
  businessName: z.string().min(1, "Business name is required").optional(),
  businessAddress: businessAddressSchema.optional(),
  zipCode: z.string().min(1, "Zip code is required").optional(),
  businessPhone: z
    .string({ invalid_type_error: "Phone Number must be string" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
  website: z.string().url().optional(),
  businessLogo: z.string().url().optional(),
  socialLinks: z.array(z.string().url()).optional().default([]),
  yearsInBusiness: z.number().optional(),
  numberOfLocations: z.number().optional(),
  description: z.string().min(1, "Description is required").optional(),
  images: z.array(z.string().url()).optional().default([]),
});
