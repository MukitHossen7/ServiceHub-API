import express from "express";
import { OtpController } from "./otp.controller";

const otpRoute = express.Router();

otpRoute.post("/send", OtpController.sendOTP);
otpRoute.post("/verify", OtpController.verifyOTP);

export default otpRoute;
