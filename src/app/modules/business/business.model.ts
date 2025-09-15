import { model, Schema } from "mongoose";
import { IBusiness, IBusinessAddress, IStatus } from "./business.interface";

const businessAddressSchema = new Schema<IBusinessAddress>(
  {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, trim: true },
    country: { type: String, required: true, trim: true },
  },
  { _id: false, versionKey: false }
);

const businessSchema = new Schema<IBusiness>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    businessName: { type: String, required: true, trim: true },
    businessAddress: { type: businessAddressSchema, required: true },
    zipCode: { type: String, required: true, trim: true },
    businessPhone: { type: String, required: true, trim: true },
    website: { type: String },
    businessLogo: { type: String },
    socialLinks: { type: [String], default: [] },
    yearsInBusiness: { type: Number, required: true },
    numberOfLocations: { type: Number },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(IStatus),
      default: IStatus.PENDING,
    },
    images: { type: [String], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Business = model<IBusiness>("Business", businessSchema);
