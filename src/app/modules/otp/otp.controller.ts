import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { OtpService } from "./otp.service";

const sendOTP = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  await OtpService.sendOTP(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Send OTP successfully",
    data: null,
  });
});

const verifyOTP = catchAsync(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  await OtpService.verifyOTP(email, otp);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OTP Verify successfully",
    data: null,
  });
});

export const OtpController = {
  sendOTP,
  verifyOTP,
};
