import jwt from "jsonwebtoken";
import { comparepassword, hashPassword } from "../utils/hashPassword.js";
import User from "../models/userModel.js";

export const loginController = async (req, res) => {
  try {
    if (!req.body.email) {
      return res
        .status(400)
        .send({ success: false, message: "email is required" });
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(req.body.email)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid email format. Please enter a valid email address." });
    }
    if (!req.body.password) {
      return res
        .status(400)
        .send({ success: false, message: "password is required" });
    }

    const userData = await User.findOne({where:{ email: req.body.email} });
    let error={
      email:"",
      password:""
    };
    if(!userData){
        error.email="Invalid email";
    }
    else if(!(await comparepassword(req.body.password, userData.password))){
        error.password="Invalid password";
    }
    if (!error.email && !error.password) 
      {
      const { id, email } =userData;
      const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
        expiresIn: 30000,
      });
      return res.status(200).send({
        success: true,
        message: "login success",
        token,
      });
    } else {
      return res.status(400).send({
        success: false,
        error
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const registerController = async (req, res) => {
  try {
    if (!req.body.email) {
        return res
          .status(400)
          .send({ success: false, message: "email is required" });
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(req.body.email)) {
        return res
          .status(400)
          .send({ success: false, message: "Invalid email format. Please enter a valid email address." });
      }
      if (!req.body.password) {
        return res
          .status(400)
          .send({ success: false, message: "password is required" });
      }

    const { email } = req.body;
    const existinguser = await User.findOne({ where:{email} });
    if (existinguser) {
      return res.status(400).send({
        success: false,
        message: "user already registerd please login!",
      });
    }
    req.body.password = await hashPassword(req.body.password);
    const user = await User.create(req.body);
    return res.status(200).send({
      success: true,
      message: "User registered successfully",
      user: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};
