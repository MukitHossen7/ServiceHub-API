import express from "express";
import { reviewController } from "./review.controller";

const reviewRoute = express.Router();

reviewRoute.post("/:businessId", reviewController.createService);

export default reviewRoute;
