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

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const user = await userServices.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Retrieved Successfully",
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

const updateUserById = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const payload = req.body;
  const decodedToken = req.user as JwtPayload;
  const user = await userServices.updateUserById(userId, payload, decodedToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Update Successfully",
    data: user,
  });
});

export const userControllers = {
  createUser,
  getMe,
  updateUserById,
  getAllUsers,
};
