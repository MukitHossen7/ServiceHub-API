import express from "express";
import { businessControllers } from "./business.controller";
import { zodValidateRequest } from "../../middlewares/zodValidateRequest";
import { createBusinessZodSchema } from "./business.zod.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const businessRoute = express.Router();

businessRoute.post(
  "/",
  checkAuth(Role.USER),
  zodValidateRequest(createBusinessZodSchema),
  businessControllers.createBusinessProfile
);

export default businessRoute;
