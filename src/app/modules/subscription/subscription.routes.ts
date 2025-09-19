import express from "express";
import { subscriptionController } from "./subscription.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { zodValidateRequest } from "../../middlewares/zodValidateRequest";
import {
  createSubscriptionZodSchema,
  updateSubscriptionZodSchema,
} from "./subscription.zod.validation";

const subscriptionRoute = express.Router();

// Create Subscription (Vendor/User)
subscriptionRoute.post(
  "/",
  checkAuth(Role.USER, Role.VENDOR),
  zodValidateRequest(createSubscriptionZodSchema),
  subscriptionController.createSubscription
);

// Get All Subscriptions (Admin)
subscriptionRoute.get(
  "/",
  checkAuth(Role.ADMIN),
  subscriptionController.getAllSubscription
);

// Get Subscription By ID (Vendor)
subscriptionRoute.get(
  "/:subscriptionId",
  checkAuth(Role.VENDOR),
  subscriptionController.getSubscriptionById
);

// update subscription status
subscriptionRoute.patch(
  "/:subscriptionId/status",
  checkAuth(...Object.values(Role)),
  zodValidateRequest(updateSubscriptionZodSchema),
  subscriptionController.updateSubscriptionStatus
);

export default subscriptionRoute;
