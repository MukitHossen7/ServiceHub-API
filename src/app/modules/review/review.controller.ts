import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { reviewServices } from "./review.service";
import { JwtPayload } from "jsonwebtoken";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const { businessId } = req.params;
  const { id: userId } = req.user as JwtPayload;
  const payload = req.body;
  const reviewData = await reviewServices.createReview(
    businessId,
    userId,
    payload
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Review Created Successfully",
    data: reviewData,
  });
});

const getReviewsByBusiness = catchAsync(async (req: Request, res: Response) => {
  const { businessId } = req.params;

  const reviews = await reviewServices.getReviewsByBusiness(
    businessId as string
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews Retrieve successfully",
    data: reviews,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const reviews = await reviewServices.getAllReviews();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All reviews retrieved successfully",
    data: reviews,
  });
});

const getMyReviews = catchAsync(async (req: Request, res: Response) => {
  const { id: userId } = req.user as JwtPayload;
  const reviews = await reviewServices.getMyReviews(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My Reviews retrieved successfully",
    data: reviews,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { id: userId } = req.user as JwtPayload;
  const { reviewId } = req.params;
  const payload = req.body;

  const updatedReview = await reviewServices.updateReview(
    reviewId,
    userId,
    payload
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review updated successfully",
    data: updatedReview,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { id: userId, role } = req.user as JwtPayload;
  const { reviewId } = req.params;

  const result = await reviewServices.deleteReview(reviewId, userId, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review deleted successfully",
    data: result,
  });
});

export const reviewController = {
  createReview,
  getReviewsByBusiness,
  getAllReviews,
  getMyReviews,
  updateReview,
  deleteReview,
};
