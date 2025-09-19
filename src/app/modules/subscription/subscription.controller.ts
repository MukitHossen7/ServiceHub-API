import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { subscriptionServices } from "./subscription.service";
import { JwtPayload } from "jsonwebtoken";

const createSubscription = catchAsync(async (req: Request, res: Response) => {
  const { id: userId } = req.user as JwtPayload;
  const subscriptionData = await subscriptionServices.createSubscription(
    userId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Subscription Created Successfully",
    data: {
      payment: subscriptionData.paymentURL,
      subscription: subscriptionData.subscription,
    },
  });
});

const getAllSubscription = catchAsync(async (req: Request, res: Response) => {
  const subscription = await subscriptionServices.getAllSubscription();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Subscription retrieved successfully",
    data: subscription,
  });
});

const getSubscriptionById = catchAsync(async (req: Request, res: Response) => {
  const subscription = await subscriptionServices.getSubscriptionById();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subscription retrieved successfully",
    data: subscription,
  });
});

const updateSubscriptionStatus = catchAsync(
  async (req: Request, res: Response) => {
    const updated = await subscriptionServices.updateSubscriptionStatus();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Subscription Status Updated Successfully",
      data: updated,
    });
  }
);

export const subscriptionController = {
  createSubscription,
  getAllSubscription,
  getSubscriptionById,
  updateSubscriptionStatus,
};
