import express from "express";
import { authController } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const authRoute = express.Router();

authRoute.post("/login", authController.createLogin);
authRoute.post("/refresh-token", authController.createNewAccessToken);
authRoute.post("/logout", authController.logOutUser);
authRoute.post(
  "/change-password",
  checkAuth(...Object.values(Role)),
  authController.changePassword
);

// ai routes kajgolo pora korta hoba

// set-password
// reset-password
// forgot-password

//google
//google/callback

export default authRoute;
