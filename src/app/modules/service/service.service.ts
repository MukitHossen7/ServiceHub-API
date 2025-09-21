import { JwtPayload } from "jsonwebtoken";
import { IService } from "./service.interface";

const createService = async (payload: Partial<IService>, user: JwtPayload) => {
  return {};
};

const getAllServices = async () => {
  return {};
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
  getCommonServices,
  getSingleService,
  updateService,
  deleteService,
};
