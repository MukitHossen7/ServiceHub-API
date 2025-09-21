import { Types } from "mongoose";

export enum ServiceStatus {
  AVAILABLE = "AVAILABLE",
  UNAVAILABLE = "UNAVAILABLE",
}

export interface IService {
  _id?: string;
  business: Types.ObjectId;
  name: string;
  category: string;
  slug?: string;
  description: string;
  images?: string[];
  includedServices?: string[];
  excludedServices?: string[];
  price: number;
  duration?: string;
  status: ServiceStatus;
}
