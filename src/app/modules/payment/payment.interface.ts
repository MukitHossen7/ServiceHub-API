import { Types } from "mongoose";

export enum PAYMENT_STATUS {
  PAID = "PAID",
  UNPAID = "UNPAID",
  REFUNDED = "REFUNDED",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
}

export interface IPayment {
  subscription: Types.ObjectId;
  transactionId: string;
  price: number;
  paymentGatewayData?: any;
  invoiceUrl?: string;
  status: PAYMENT_STATUS;
  refundRequested?: boolean;
  createdAt?: Date;
}
