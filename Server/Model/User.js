import { Schema, model } from "mongoose";

const userDetails = new Schema(
  {
    uuid: String,
    name: { type: String },
    email: { type: String, unique: true },
    password: String,
    companyName: String,
    website: String,
    role: { type: String, default: "advertiser" },
    walletBalance: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = model("User", userDetails);

export default User;
