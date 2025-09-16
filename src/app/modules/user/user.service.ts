import config from "../../config";
import AppError from "../../errorHelpers/AppError";
import { IAuthsProviders, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";

const createUser = async (payload: Partial<IUser>) => {
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

const updateUserById = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  if (decodedToken.role === Role.USER || decodedToken.role === Role.VENDOR) {
    if (userId !== decodedToken.id) {
      throw new AppError(401, "You are not authorized");
    }
  }

  if (payload.email || payload.password) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Updating email or password is not allowed"
    );
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (decodedToken.role === Role.ADMIN) {
    throw new AppError(401, "You are not authorized");
  }

  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.VENDOR) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You do not have permission to change user roles"
      );
    }
  }

  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.VENDOR) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You do not have permission to change user roles"
      );
    }
  }

  const updatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
  return updatedUser;
};

const getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

export const userServices = {
  createUser,
  getMe,
  updateUserById,
  getAllUsers,
};
