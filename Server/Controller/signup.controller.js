import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import {
  userSignUpMongoDB,
  checkUserExists,
} from "../mongodb/controller/auth.model.js";

export const signUp = async (req, res) => {
  const { email, password,name } = req.body;  
  const regexForValidEmail = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const regexForValidPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    // check for user credentials
  if (!name || !password || !email) {
    return res.status(403).json({ message: "Complete the form" });
  }
// validate email
  if (!regexForValidEmail.test(email)) {
    return res
      .status(403)
      .json({ emailValidationError: "Email is not a valid email" });
  }
  // validate password
  if (!regexForValidPassword.test(password)) {
    return res.status(403).json({
      passwordValidationError:
        "Password must have minimum of 8 characters, 1 Uppercase Letter, 1 Lowercase Letter, 1 Number and 1 Special Character",
    });
  }
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    //check user in mongoDb
    const checkIfUserExist = await checkUserExists(email);

    if (checkIfUserExist) {
      return res
        .status(403)
        .json({ emailValidationError: "Email already Exist" });
    }
    // generate a uuid
    const uuid = v4();

    const {userIdToString} = await userSignUpMongoDB(
      email,
      password,
      name,
      uuid,
      hashedPassword
    );

    // sign a token and send to browser
    const token = jwt.sign(
      { _id: userIdToString,  role  },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );
    return res.status(201).json({ token, message: "Login Successful" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
