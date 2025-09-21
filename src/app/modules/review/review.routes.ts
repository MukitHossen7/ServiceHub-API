import express from "express";
import { reviewController } from "./review.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { zodValidateRequest } from "../../middlewares/zodValidateRequest";
import {
  createReviewZodSchema,
  updateReviewZodSchema,
} from "./review.zod.validation";

const reviewRoute = express.Router();

reviewRoute.post(
  "/:businessId",
  checkAuth(Role.USER),
  zodValidateRequest(createReviewZodSchema),
  reviewController.createReview
);

reviewRoute.get("/", checkAuth(Role.ADMIN), reviewController.getAllReviews);

reviewRoute.get(
  "/my-reviews",
  checkAuth(Role.USER),
  reviewController.getMyReviews
);

reviewRoute.get("/:businessId", reviewController.getReviewsByBusiness);

reviewRoute.patch(
  "/:reviewId",
  checkAuth(Role.USER),
  zodValidateRequest(updateReviewZodSchema),
  reviewController.updateReview
);

reviewRoute.delete(
  "/:reviewId",
  checkAuth(Role.USER, Role.ADMIN),
  reviewController.deleteReview
);

export default reviewRoute;
