import { Schema, model } from "mongoose";

const transactionDetails = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: Number,
    paymentGateway: String, // e.g., PayPal, Stripe, Paystack
    status: { type: String, default: "pending" }, // pending, completed, failed
    reference: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Transaction = model("Transaction", transactionDetails);

export default Transaction;
