import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { businessServices } from "./business.service";

const createBusinessProfile = catchAsync(
  async (req: Request, res: Response) => {
    const businessData = await businessServices.createBusinessProfile();
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Business Profile Created Successfully",
      data: businessData,
    });
  }
);

export const businessControllers = {
  createBusinessProfile,
};
