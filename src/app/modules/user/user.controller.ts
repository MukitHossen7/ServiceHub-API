import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { userServices } from "./user.service";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userServices.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User Created Successfully",
    data: user,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const decoded = req.user as JwtPayload;
  const user = await userServices.getMe(decoded?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "You profile Retrieved Successfully",
    data: user,
  });
});

export const userControllers = {
  createUser,
  getMe,
};
