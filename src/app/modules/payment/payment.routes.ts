import express from "express";
import { paymentController } from "./payment.controller";

const paymentRoute = express.Router();

paymentRoute.post("/success", paymentController.successPayment);

export default paymentRoute;
