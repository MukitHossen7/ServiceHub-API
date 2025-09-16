import { model, Schema } from "mongoose";
import { IPayment, PAYMENT_STATUS } from "./payment.interface";

const PaymentSchema = new Schema<IPayment>(
  {
    subscription: {
      type: Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },
    transactionId: {
      type: String,
      unique: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    paymentGatewayData: Schema.Types.Mixed,
    invoiceUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.UNPAID,
    },
    refundRequested: { type: Boolean, default: false },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Payment = model<IPayment>("Payment", PaymentSchema);
