import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import config from "../../config";

const successPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await paymentService.successPayment(
    query as Record<string, string>
  );
  if (result.success) {
    res.redirect(config.SSLCOMMERZ.SLL_SUCCESS_FRONTEND_URL);
  }
});

const failPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await paymentService.failPayment();
  res;
});

const cancelPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await paymentService.cancelPayment();
  res;
});

export const paymentController = {
  successPayment,
  failPayment,
  cancelPayment,
};
