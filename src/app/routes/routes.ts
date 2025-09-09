import { Router } from "express";
import userRoute from "../modules/user/user.routes";

const routes = Router();

routes.use("/users", userRoute);

export default routes;
