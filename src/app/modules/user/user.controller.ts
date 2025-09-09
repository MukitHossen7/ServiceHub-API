import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { userServices } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userServices.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User Created Successfully",
    data: user,
  });
});

export const userControllers = {
  createUser,
};
