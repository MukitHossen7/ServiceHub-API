import { getTransactionId } from "../../utils/getTransactionId";
import { Business } from "../business/business.model";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Payment } from "../payment/payment.model";
import { SslService } from "../sslCommerce/sslCommerce.service";
import { ISslCommerce } from "../sslCommerce/sslCommerz.interface";
import {
  ISubscription,
  Subscription_Status,
  SubscriptionPlan,
} from "./subscription.interface";
import { Subscription } from "./subscription.model";
import AppError from "./../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { User } from "../user/user.model";
import { Role } from "../user/user.interface";

const createSubscription = async (
  userId: string,
  payload: Partial<ISubscription>
) => {
  const transactionId = getTransactionId();
  const { plan } = payload || {};
  //compute price
  const prices: Record<SubscriptionPlan, number> = {
    [SubscriptionPlan.ONE_MONTH]: 8000,
    [SubscriptionPlan.SIX_MONTH]: 48000,
    [SubscriptionPlan.TWELVE_MONTH]: 100000,
  };

  if (!plan) {
    throw new AppError(400, "Plan is required");
  }
  const price = prices[plan];
  const session = await Subscription.startSession();
  session.startTransaction();
  try {
    const businessProfile = await Business.findOne({ user: userId });
    if (
      !businessProfile?.zipCode ||
      !businessProfile?.businessPhone ||
      !businessProfile?.businessAddress
    ) {
      throw new AppError(
        400,
        "Please update Your Business Profile to Subscription"
      );
    }
    if (businessProfile?.isDeleted === true) {
      throw new AppError(400, "This business has been deleted");
    }

    const subscription = await Subscription.create(
      [
        {
          user: userId,
          business: businessProfile._id,
          plan: plan,
          status: Subscription_Status.PENDING,
        },
      ],
      { session }
    );

    const payment = await Payment.create(
      [
        {
          subscription: subscription[0]._id,
          transactionId: transactionId,
          price: price,
          status: PAYMENT_STATUS.UNPAID,
        },
      ],
      { session }
    );

    const updateSubscription = await Subscription.findByIdAndUpdate(
      subscription[0]._id,
      {
        payment: payment[0]._id,
      },
      {
        new: true,
        runValidators: true,
        session,
      }
    )
      .populate("user", "name email")
      .populate("business", "businessPhone zipCode businessAddress")
      .populate("payment");

    const sslPayload: ISslCommerce = {
      amount: price,
      transactionId: transactionId,
      name: (updateSubscription?.user as any)?.name,
      email: (updateSubscription?.user as any)?.email,
      phoneNumber: (updateSubscription?.business as any)?.businessPhone,
      address: (updateSubscription?.business as any)?.businessAddress,
    };

    const sslPayment = await SslService.sslPaymentInit(sslPayload);

    await session.commitTransaction();
    session.endSession();

    return {
      paymentURL: sslPayment.GatewayPageURL,
      subscription: updateSubscription,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllSubscription = async () => {
  const allSubscription = await Subscription.find({}).sort({
    createdAt: "desc",
  });
  return allSubscription;
};

const getSubscriptionById = async (subscriptionId: string) => {
  const subscription = await Subscription.findById(subscriptionId);
  if (!subscription) {
    throw new AppError(httpStatus.NOT_FOUND, "Subscription is Not Found");
  }
  return subscription;
};

const approveSubscription = async (subscriptionId: string) => {
  const session = await Subscription.startSession();
  session.startTransaction();
  try {
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      throw new AppError(httpStatus.NOT_FOUND, "Subscription not found");
    }
    if (subscription.status === Subscription_Status.CANCEL) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "This subscription has been cancelled and cannot be approved"
      );
    }
    const updateSubscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      { isApprovedByAdmin: true },
      { new: true, runValidator: true, session }
    );

    await User.findByIdAndUpdate(
      subscription.user,
      { role: Role.VENDOR },
      { new: true, runValidators: true, session }
    );

    await session.commitTransaction();
    session.endSession();
    return updateSubscription;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const cancelSubscription = async (subscriptionId: string) => {
  const session = await Subscription.startSession();
  session.startTransaction();
  try {
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      throw new AppError(httpStatus.NOT_FOUND, "Subscription not found");
    }

    const payment = await Payment.findById(subscription.payment);
    if (!payment) {
      throw new AppError(httpStatus.NOT_FOUND, "Payment not found");
    }

    // Subscription cancel
    // Future scope: await SslService.sslRefundInit(payment.transactionId, payment.price);

    const updateSubscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      {
        status: Subscription_Status.CANCEL,
        isApprovedByAdmin: false,
      },
      { new: true, runValidators: true, session }
    );
    await Payment.findByIdAndUpdate(
      payment._id,
      {
        status: PAYMENT_STATUS.REFUNDED,
        refundRequested: true,
      },
      { new: true, runValidators: true, session }
    );

    await User.findByIdAndUpdate(
      subscription.user,
      {
        role: Role.USER,
      },
      { new: true, runValidators: true, session }
    );
    await session.commitTransaction();
    session.endSession();
    return updateSubscription;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const subscriptionServices = {
  createSubscription,
  getAllSubscription,
  getSubscriptionById,
  approveSubscription,
  cancelSubscription,
};
