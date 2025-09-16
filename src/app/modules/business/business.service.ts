import AppError from "../../errorHelpers/AppError";
import { IBusiness } from "./business.interface";
import { Business } from "./business.model";

const createBusinessProfile = async ({
  userId,
  payload,
}: {
  userId: string;
  payload: Partial<IBusiness>;
}) => {
  const existing = await Business.findOne({ user: userId, isDeleted: false });
  if (existing) {
    throw new AppError(400, "You already have a business profile");
  }

  const business = await Business.create({ user: userId, ...payload });
  return business;
};

export const businessServices = {
  createBusinessProfile,
};
