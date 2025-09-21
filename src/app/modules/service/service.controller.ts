import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { servicesService } from "./service.service";
import { JwtPayload } from "jsonwebtoken";

const createService = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const ServerData = await servicesService.createService(req.body, user);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Service Created Successfully",
    data: ServerData,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await servicesService.getAllServices();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All services retrieved successfully",
    data: result,
  });
});

const getCommonServices = catchAsync(async (req: Request, res: Response) => {
  const result = await servicesService.getCommonServices();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Common service types retrieved successfully",
    data: result,
  });
});

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await servicesService.getSingleService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single service retrieved successfully",
    data: result,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user as JwtPayload;
  const result = await servicesService.updateService(id, req.body, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service updated successfully",
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user as JwtPayload;
  const result = await servicesService.deleteService(id, user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service deleted successfully",
    data: result,
  });
});

export const serviceController = {
  createService,
  getAllServices,
  getCommonServices,
  getSingleService,
  updateService,
  deleteService,
};
