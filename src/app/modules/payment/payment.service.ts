import AppError from "../../errorHelpers/AppError";
import { SslService } from "../sslCommerce/sslCommerce.service";
import { ISslCommerce } from "../sslCommerce/sslCommerz.interface";
import { Subscription_Status } from "../subscription/subscription.interface";
import { Subscription } from "../subscription/subscription.model";
import { PAYMENT_STATUS } from "./payment.interface";
import { Payment } from "./payment.model";
import httpStatus from "http-status-codes";

const successPayment = async (query: Record<string, string>) => {
  const session = await Subscription.startSession();
  session.startTransaction();
  try {
    const updatePayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      {
        status: PAYMENT_STATUS.PAID,
      },
      { session, new: true, runValidators: true }
    );

    await Subscription.findByIdAndUpdate(
      updatePayment?.subscription,
      { status: Subscription_Status.COMPLETED },
      { session, new: true, runValidators: true }
    );

    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      message: "Payment Completed Successfully",
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const failPayment = async (query: Record<string, string>) => {
  const session = await Subscription.startSession();
  session.startTransaction();
  try {
    const updatePayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      {
        status: PAYMENT_STATUS.FAILED,
      },
      { session, new: true, runValidators: true }
    );

    await Subscription.findByIdAndUpdate(
      updatePayment?.subscription,
      { status: Subscription_Status.FAILED },
      { session, new: true, runValidators: true }
    );

    await session.commitTransaction();
    session.endSession();

    return {
      success: false,
      message: "Payment Failed",
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const cancelPayment = async (query: Record<string, string>) => {
  const session = await Subscription.startSession();
  session.startTransaction();
  try {
    const updatePayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      {
        status: PAYMENT_STATUS.CANCELLED,
      },
      { session, new: true, runValidators: true }
    );

    await Subscription.findByIdAndUpdate(
      updatePayment?.subscription,
      { status: Subscription_Status.CANCEL },
      { session, new: true, runValidators: true }
    );

    await session.commitTransaction();
    session.endSession();

    return {
      success: false,
      message: "Payment Cancel",
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const initPayment = async (subscriptionId: string) => {
  const payment = await Payment.findOne({
    subscription: subscriptionId,
  });

  if (!payment) {
    throw new AppError(httpStatus.NOT_FOUND, "Payment Not Found.");
  }

  const subscriptionData = await Subscription.findById(subscriptionId)
    .populate("user", "name email")
    .populate("business", "businessPhone businessAddress");

  const sslPayload: ISslCommerce = {
    amount: payment.price,
    transactionId: payment.transactionId,
    name: (subscriptionData?.user as any)?.name,
    email: (subscriptionData?.user as any)?.email,
    phoneNumber: (subscriptionData?.business as any)?.businessPhone,
    address: (subscriptionData?.business as any)?.businessAddress,
  };

  const sslPayment = await SslService.sslPaymentInit(sslPayload);
  return {
    paymentURL: sslPayment.GatewayPageURL,
  };
};

export const paymentService = {
  successPayment,
  failPayment,
  cancelPayment,
  initPayment,
};
