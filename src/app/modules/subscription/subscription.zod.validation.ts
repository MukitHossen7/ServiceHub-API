import { z } from "zod";
import { Subscription_Status } from "./subscription.interface";

export const createSubscriptionZodSchema = z.object({
  business: z.string().optional(),
  payment: z.string().optional(),
  plan: z.enum(["1_month", "6_month", "12_month"]),
  startedAt: z.date().optional(),
  expiresAt: z.date().optional(),
});

export const updateSubscriptionZodSchema = z.object({
  status: z.enum(Object.values(Subscription_Status) as [string]),
});
