import { Router } from "express";
import userRoute from "../modules/user/user.routes";
import authRoute from "../modules/auth/auth.routes";
import otpRoute from "../modules/otp/otp.route";
import businessRoute from "../modules/business/business.routes";
import serviceRoute from "../modules/service/business.routes";

const routes = Router();

routes.use("/users", userRoute);
routes.use("/auth", authRoute);
routes.use("/otp", otpRoute);
routes.use("/businesses", businessRoute);
routes.use("/services", serviceRoute);

export default routes;
