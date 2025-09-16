import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { reviewServices } from "./review.service";

const createService = catchAsync(async (req: Request, res: Response) => {
  const reviewData = await reviewServices.createReview();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Review Created Successfully",
    data: reviewData,
  });
});

export const reviewController = {
  createService,
};
