import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import passport from "passport";
import AppError from "../../errorHelpers/AppError";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { createUserTokens } from "../../utils/userToken";
import { setAuthCookie } from "../../utils/setCookie";

const createLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", async (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(new AppError(401, info.message));
      }
      const userToken = createUserTokens(user);

      const { password, ...rest } = user.toObject();

      setAuthCookie(res, userToken);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Login Successfully",
        data: {
          accessToken: userToken.accessToken,
          refreshToken: userToken.refreshToken,
          user: rest,
        },
      });
    })(req, res, next);
  }
);

export const authController = {
  createLogin,
};
