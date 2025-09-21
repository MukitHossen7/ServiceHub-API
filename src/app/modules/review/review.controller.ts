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

export const reviewController = {
  createReview,
  getReviewsByBusiness,
  getAllReviews,
};
