import AppError from "../../errorHelpers/AppError";
import { Business } from "../business/business.model";
import httpStatus from "http-status-codes";
import { Review } from "./review.model";
import { IReview } from "./review.interface";

const createReview = async (
  businessId: string,
  userId: string,
  payload: Partial<IReview>
) => {
  const business = await Business.findById(businessId);
  if (!business) {
    throw new AppError(httpStatus.NOT_FOUND, "Business not Found");
  }

  if (business.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This business is deleted, you cannot add a review"
    );
  }

  if (!business.isActive) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This business is not active, you cannot add a review"
    );
  }

  if (business.status !== "APPROVED") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This business is not approved yet, you cannot add a review"
    );
  }

  const review = await Review.create({
    user: userId,
    business: businessId,
    ...payload,
  });

  return review;
};

const getReviewsByBusiness = async (businessId: string) => {
  const business = await Business.findById(businessId);

  if (!business) {
    throw new AppError(httpStatus.NOT_FOUND, "Business not found");
  }

  // Business status check
  if (business.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This business is deleted, reviews cannot be fetched"
    );
  }

  if (!business.isActive) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This business is not active, reviews cannot be fetched"
    );
  }

  if (business.status !== "APPROVED") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This business is not approved yet, reviews cannot be fetched"
    );
  }

  const reviews = await Review.find({ business: businessId }).populate(
    "user",
    "name email"
  );

  return reviews;
};

const getAllReviews = async () => {
  const reviews = await Review.find()
    .populate("user", "name email")
    .populate(
      "business",
      "businessName businessAddress businessPhone isActive status"
    );

  return reviews;
};

export const reviewServices = {
  createReview,
  getReviewsByBusiness,
  getAllReviews,
};
