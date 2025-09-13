import { Router } from "express";
import userRoute from "../modules/user/user.routes";
import authRoute from "../modules/auth/auth.routes";
import otpRoute from "../modules/otp/otp.route";

const routes = Router();

routes.use("/users", userRoute);
routes.use("/auth", authRoute);
routes.use("/otp", otpRoute);

export default routes;
