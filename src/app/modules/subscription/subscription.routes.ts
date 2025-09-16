import express from "express";
import { subscriptionController } from "./subscription.controller";

const subscriptionRoute = express.Router();

subscriptionRoute.post("/", subscriptionController.createSubscription);

export default subscriptionRoute;
