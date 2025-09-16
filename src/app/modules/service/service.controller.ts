import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { servicesService } from "./service.service";

const createService = catchAsync(async (req: Request, res: Response) => {
  const ServerData = await servicesService.createService();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Service Created Successfully",
    data: ServerData,
  });
});

export const serviceController = {
  createService,
};
