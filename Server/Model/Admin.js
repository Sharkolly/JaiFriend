import { Schema, model } from "mongoose";

const adminDetails = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "admin" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Admin = model("Admin", adminDetails);

export default Admin;
