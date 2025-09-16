import { model, Schema } from "mongoose";
import {
  ISubscription,
  Subscription_Status,
  SubscriptionPlan,
} from "./subscription.interface";

const subscriptionSchema = new Schema<ISubscription>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    business: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
    plan: {
      type: String,
      enum: Object.values(SubscriptionPlan),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(Subscription_Status),
      default: Subscription_Status.PENDING,
    },
    startedAt: {
      type: Date,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Subscription = model<ISubscription>(
  "Subscription",
  subscriptionSchema
);
