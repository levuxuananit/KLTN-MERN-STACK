import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import makeid from "uniqid";
import dotenv from "dotenv";
dotenv.config();

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const registerService = ({ phone, password, name, email }) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ phone });
      if (user) {
        resolve({
          err: 2,
          msg: "Phone number has been already used !",
          token: null,
        });
      } else {
        const newUser = new User({
          phone,
          name,
          password: hashPassword(password),
          id: makeid(),
          zalo: phone,
          email,
          role: "R2",
        });
        await newUser.save();
        const token = jwt.sign(
          { id: newUser.id, phone: newUser.phone, role: newUser.role },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
        resolve({
          err: 0,
          msg: "Register is successfully !",
          token,
        });
      }
    } catch (error) {
      reject(error);
    }
  });

export const loginService = ({ phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ phone });
      const isCorrectPassword =
        user && bcrypt.compareSync(password, user.password);
      const token =
        isCorrectPassword &&
        jwt.sign(
          { id: user.id, phone: user.phone, role: user.role },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Login is successfully !"
          : user
          ? "Password is wrong !"
          : "Phone number not found !",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });
