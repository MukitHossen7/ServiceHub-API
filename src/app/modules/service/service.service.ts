import { JwtPayload } from "jsonwebtoken";
import { IService } from "./service.interface";
import { Business } from "../business/business.model";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { Service } from "./service.model";
import { IBusiness, IStatus } from "../business/business.interface";

const createService = async (payload: Partial<IService>, user: JwtPayload) => {
  const business = await Business.findOne({ user: user.id });

  if (!business) {
    throw new AppError(httpStatus.NOT_FOUND, "Business Not Found");
  }

  // Check business is not deleted
  if (business.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This business is deleted, you cannot add a service"
    );
  }

  // Check business is active
  if (!business.isActive) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This business is not active, you cannot add a service"
    );
  }

  // Check business status
  if (business.status !== IStatus.APPROVED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This business is not approved yet, you cannot add a service"
    );
  }

  const service = await Service.create({
    ...payload,
    business: business._id,
  });
  return service;
};

const getAllServices = async () => {
  const services = await Service.find({
    status: "AVAILABLE",
  }).populate({
    path: "business",
    match: {
      status: "APPROVED",
      isActive: true,
      isDeleted: false,
    },
    select: "businessName businessAddress",
  });
  const grouped: Record<string, any[]> = {};
  services.forEach((service) => {
    const category = service.category || "Others";
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(service);
  });
  return grouped;
};

const searchServices = async (query: Record<string, string>) => {
  const { name, zipCode } = query;
  const serviceFilter: any = { status: "AVAILABLE" };
  if (name) {
    serviceFilter.name = {
      $regex: name as string,
      $options: "i",
    };
  }

  const services = await Service.find(serviceFilter).populate({
    path: "business",
    match: {
      status: "APPROVED",
      isDeleted: false,
      isActive: true,
    },
    select: "businessName businessAddress zipCode",
  });

  let filtered = services;
  if (zipCode) {
    filtered = services.filter((s) => {
      const business = s.business as unknown as IBusiness;
      return business && business.zipCode === zipCode;
    });
  }

  return filtered;
};

const getCommonServices = async () => {
  return {};
};

const getSingleService = async (id: string) => {
  return {};
};

const updateService = async (
  id: string,
  payload: Partial<IService>,
  user: JwtPayload
) => {
  return {};
};

const deleteService = async (id: string, user: JwtPayload) => {
  return {};
};

export const servicesService = {
  createService,
  getAllServices,
  searchServices,
  getCommonServices,
  getSingleService,
  updateService,
  deleteService,
};
