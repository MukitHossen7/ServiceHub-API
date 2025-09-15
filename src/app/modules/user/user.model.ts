import { model, Schema } from "mongoose";
import {
  IAddress,
  IAuthsProviders,
  IsActive,
  IUser,
  Role,
} from "./user.interface";

const authsSchema = new Schema<IAuthsProviders>(
  {
    provider: {
      type: String,
      required: true,
    },
    providerID: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    _id: false,
  }
);

const addressSchema = new Schema<IAddress>(
  {
    street: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    zipCode: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
  },
  {
    versionKey: false,
    _id: false,
  }
);

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    picture: {
      type: String,
      trim: true,
    },
    address: {
      type: addressSchema,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    auths: [authsSchema],
  },
  { versionKey: false, timestamps: true }
);

export const User = model<IUser>("User", userSchema);
