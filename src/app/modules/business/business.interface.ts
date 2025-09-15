import { Types } from "mongoose";

export enum IStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

// Business Interface
export interface IBusiness {
  _id?: string;
  user: Types.ObjectId;
  businessName: string;
  businessAddress: string;
  zipCode: string;
  businessPhone: string;
  website?: string;
  businessLogo?: string;
  socialLinks: string[];
  yearsInBusiness: number;
  numberOfLocations?: number;
  description: string;
  status?: IStatus;
  images?: string[];
}
