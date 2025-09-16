import { Types } from "mongoose";

export enum SubscriptionPlan {
  ONE_MONTH = "1_month",
  SIX_MONTH = "6_month",
  TWELVE_MONTH = "12_month",
}
export enum Subscription_Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCEL = "CANCEL",
  FAILED = "FAILED",
}

export interface ISubscription {
  _id?: string;
  user: Types.ObjectId;
  business: Types.ObjectId;
  payment?: Types.ObjectId;
  plan: SubscriptionPlan;
  status: Subscription_Status;
  startedAt?: Date;
  expiresAt?: Date;
}
