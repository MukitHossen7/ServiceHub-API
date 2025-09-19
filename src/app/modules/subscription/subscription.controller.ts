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
  const { subscriptionId } = req.params;
  const subscription = await subscriptionServices.getSubscriptionById(
    subscriptionId as string
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subscription retrieved successfully",
    data: subscription,
  });
});

const approveSubscription = catchAsync(async (req: Request, res: Response) => {
  const { subscriptionId } = req.params;
  const updated = await subscriptionServices.approveSubscription(
    subscriptionId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subscription approved successfully",
    data: updated,
  });
});

export const subscriptionController = {
  createSubscription,
  getAllSubscription,
  getSubscriptionById,
  approveSubscription,
};
