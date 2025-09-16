import { Types } from "mongoose";

export enum IStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface IBusinessAddress {
  street: string;
  city: string;
  state?: string;
  country: string;
}

// Business Interface
export interface IBusiness {
  _id?: string;
  user: Types.ObjectId;
  businessName: string;
  businessAddress: IBusinessAddress;
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
  isDeleted?: boolean;
  isActive?: boolean;
  location?: { type: "Point"; coordinates: [number, number] };
}
