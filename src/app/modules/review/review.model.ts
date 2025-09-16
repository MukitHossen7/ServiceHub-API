import { model, Schema } from "mongoose";
import { IReview } from "./review.interface";

const ReviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    business: { type: Schema.Types.ObjectId, ref: "Business", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Review = model<IReview>("Review", ReviewSchema);
