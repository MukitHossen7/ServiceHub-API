import { Router } from "express";
import userRoute from "../modules/user/user.routes";
import authRoute from "../modules/auth/auth.routes";
import otpRoute from "../modules/otp/otp.route";
import businessRoute from "../modules/business/business.routes";
import serviceRoute from "../modules/service/business.routes";
import reviewRoute from "../modules/review/review.routes";

const routes = Router();

routes.use("/users", userRoute);
routes.use("/auth", authRoute);
routes.use("/otp", otpRoute);
routes.use("/businesses", businessRoute);
routes.use("/services", serviceRoute);
routes.use("/reviews", reviewRoute);

export default routes;
