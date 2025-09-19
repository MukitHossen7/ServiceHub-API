import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import config from "../../config";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const successPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await paymentService.successPayment(
    query as Record<string, string>
  );
  if (result.success) {
    res.redirect(
      `${config.SSLCOMMERZ.SLL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=success`
    );
  }
});

const failPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await paymentService.failPayment(
    query as Record<string, string>
  );
  if (!result.success) {
    res.redirect(
      `${config.SSLCOMMERZ.SLL_FAIL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=fail`
    );
  }
});

const cancelPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await paymentService.cancelPayment(
    query as Record<string, string>
  );
  if (!result.success) {
    res.redirect(
      `${config.SSLCOMMERZ.SLL_CANCEL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=cancel`
    );
  }
});

const initPayment = catchAsync(async (req: Request, res: Response) => {
  const { subscriptionId } = req.params;
  const result = await paymentService.initPayment(subscriptionId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Payment Init Successfully",
    data: result,
  });
});

export const paymentController = {
  successPayment,
  failPayment,
  cancelPayment,
  initPayment,
};
