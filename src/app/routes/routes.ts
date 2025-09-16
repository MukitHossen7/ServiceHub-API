import { Router } from "express";
import userRoute from "../modules/user/user.routes";
import authRoute from "../modules/auth/auth.routes";
import otpRoute from "../modules/otp/otp.route";
import businessRoute from "../modules/business/business.routes";
import reviewRoute from "../modules/review/review.routes";
import subscriptionRoute from "../modules/subscription/subscription.routes";
import serviceRoute from "../modules/service/service.routes";
import paymentRoute from "../modules/payment/payment.routes";

const routes = Router();

routes.use("/users", userRoute);
routes.use("/auth", authRoute);
routes.use("/otp", otpRoute);
routes.use("/businesses", businessRoute);
routes.use("/services", serviceRoute);
routes.use("/reviews", reviewRoute);
routes.use("/subscription ", subscriptionRoute);
routes.use("/payment ", paymentRoute);

export default routes;
