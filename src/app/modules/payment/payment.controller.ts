import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { paymentService } from "./payment.service";

const successPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await paymentService.successPayment();
  res;
});

export const paymentController = {
  successPayment,
};
