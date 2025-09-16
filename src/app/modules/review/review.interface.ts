import { Types } from "mongoose";

export interface IReview {
  _id?: string;
  user: Types.ObjectId;
  business: Types.ObjectId;
  rating: number;
  comment?: string;
}
