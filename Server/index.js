"use strict";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import http from "http";
import { v4 } from "uuid";
import bcrypt from "bcryptjs";
import path from 'path';
import fs from 'fs'

const app = express();
const PORT = process.env.PORT || 5000;
const mongoDBURL = process.env.MONGODBURL;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/api/", authRoute);
// app.use("/api/foland-realty/user", tokenVerification, user);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({ success: true });
});


// mongoose
//   .connect(mongoDBURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
    app.listen(PORT, () => {
      console.log("Server Started !!", PORT);
    });
//   })
//   .catch((err) => console.log(err.message));