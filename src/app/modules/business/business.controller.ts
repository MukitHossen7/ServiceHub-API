import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { businessServices } from "./business.service";
import { JwtPayload } from "jsonwebtoken";

const createBusinessProfile = catchAsync(
  async (req: Request, res: Response) => {
    const { id: userId } = req.user as JwtPayload;
    const payload = req.body;
    const businessData = await businessServices.createBusinessProfile({
      userId,
      payload,
    });
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
