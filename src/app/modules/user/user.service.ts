import config from "../../config";
import AppError from "../../errorHelpers/AppError";
import { IAuthsProviders, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";

const createUser = async (payload: Partial<IUser>) => {
  console.log(payload);
  const { email, password, ...rest } = payload;
  const isUser = await User.findOne({ email });
  if (isUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
  }
  const authProvider: IAuthsProviders = {
    provider: "credential",
    providerID: email as string,
  };
  const hashPassword = await bcrypt.hash(
    password as string,
    Number(config.BCRYPT_SALT_ROUNDS)
  );
  const user = await User.create({
    email,
    password: hashPassword,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

const getMe = async (userId: string) => {
  const users = await User.findById(userId).select("-password");
  return users;
};

export const userServices = {
  createUser,
  getMe,
};
