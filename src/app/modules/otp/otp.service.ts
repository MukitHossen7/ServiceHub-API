import crypto from "crypto";
import { User } from "../user/user.model";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";

const OTP_EXPIRATION = 2 * 60;
const generateOtp = (length = 6) => {
  const otp = crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
  return otp;
};

const sendOTP = async (email: string) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }

  if (user.isVerified) {
    throw new AppError(401, "You are already verified");
  }

  const otp = generateOtp(6);
  const redisKey = `otp:${email}`;
};

const verifyOTP = async (email: string, otp: string) => {
  // Logic to verify the provided OTP for the email
  console.log(`Verifying OTP ${otp} for ${email}`);
};

export const OtpService = {
  sendOTP,
  verifyOTP,
};
