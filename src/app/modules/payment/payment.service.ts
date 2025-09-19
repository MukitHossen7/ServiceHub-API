import { Subscription_Status } from "../subscription/subscription.interface";
import { Subscription } from "../subscription/subscription.model";
import { PAYMENT_STATUS } from "./payment.interface";
import { Payment } from "./payment.model";

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

const failPayment = async () => {
  return {};
};

const cancelPayment = async () => {
  return {};
};

export const paymentService = {
  successPayment,
  failPayment,
  cancelPayment,
};
