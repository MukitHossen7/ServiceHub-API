import AppError from "../../errorHelpers/AppError";
import { Business } from "../business/business.model";
import httpStatus from "http-status-codes";
import { Review } from "./review.model";
import { IReview } from "./review.interface";
import { Role } from "../user/user.interface";

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

  const existingReview = await Review.findOne({
    user: userId,
    business: businessId,
  });

  if (existingReview) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already reviewed this business"
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

const getMyReviews = async (userId: string) => {
  console.log(userId);
  const reviews = await Review.find({ user: userId }).populate(
    "business",
    "businessName businessAddress businessPhone status isActive"
  );

  return reviews;
};

const updateReview = async (
  reviewId: string,
  userId: string,
  payload: Partial<IReview>
) => {
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new AppError(httpStatus.NOT_FOUND, "Review not found");
  }

  // owner check
  if (review.user.toString() !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can only update your own review"
    );
  }
  const updateReview = await Review.findByIdAndUpdate(reviewId, payload, {
    new: true,
    runValidators: true,
  });

  return updateReview;
};

const deleteReview = async (reviewId: string, userId: string, role: string) => {
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new AppError(httpStatus.NOT_FOUND, "Review not found");
  }

  // check: user owns review OR admin
  if (role !== Role.ADMIN && review.user.toString() !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can only delete your own review"
    );
  }

  await Review.findByIdAndDelete(reviewId);

  return { message: "Review deleted successfully" };
};

export const reviewServices = {
  createReview,
  getReviewsByBusiness,
  getAllReviews,
  getMyReviews,
  updateReview,
  deleteReview,
};
