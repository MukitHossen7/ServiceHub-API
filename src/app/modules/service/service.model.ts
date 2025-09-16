import { model, Schema } from "mongoose";
import { IService, ServiceStatus } from "./service.interface";

const ServiceSchema = new Schema<IService>(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    name: { type: String, required: true, index: true },
    slug: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    includedServices: {
      type: [String],
      default: [],
    },
    excludedServices: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(ServiceStatus),
      default: ServiceStatus.AVAILABLE,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Service = model<IService>("Service", ServiceSchema);
