import express from "express";
import { paymentController } from "./payment.controller";

const paymentRoute = express.Router();

paymentRoute.post("/success", paymentController.successPayment);
paymentRoute.post("/fail", paymentController.failPayment);
paymentRoute.post("/cancel", paymentController.cancelPayment);

export default paymentRoute;
