import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { subscriptionServices } from "./subscription.service";

const createSubscription = catchAsync(async (req: Request, res: Response) => {
  const subscriptionData = await subscriptionServices.createSubscription();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Subscription Created Successfully",
    data: subscriptionData,
  });
});

export const subscriptionController = {
  createSubscription,
};
