import express from "express";
import { reviewController } from "./review.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { zodValidateRequest } from "../../middlewares/zodValidateRequest";
import { createReviewZodSchema } from "./review.zod.validation";

const reviewRoute = express.Router();

reviewRoute.post(
  "/:businessId",
  checkAuth(Role.USER),
  zodValidateRequest(createReviewZodSchema),
  reviewController.createReview
);

reviewRoute.get("/:businessId", reviewController.getReviewsByBusiness);
reviewRoute.get("/", checkAuth(Role.ADMIN), reviewController.getAllReviews);

export default reviewRoute;
