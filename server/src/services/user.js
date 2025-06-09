import User from "../models/user.js";
import crypto from "crypto";
import sendMail from "./sendmail.js";
import bcrypt from "bcryptjs";

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

// GET CURRENT
export const getOne = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await User.findOne({ id }).select("-password").lean();
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get user.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const updateUser = (payload, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await User.findOneAndUpdate({ id: id }, payload, {
        new: true,
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Updated" : "Failed to update user.",
      });
    } catch (error) {
      reject(error);
    }
  });

export const resetPassword = ({ password, token }) =>
  new Promise(async (resolve, reject) => {
    try {
      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
      const user = await User.findOne({ resetPasswordToken: hashedToken });
      if (user) {
        user.password = hashPassword(password);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save();
        resolve({
          err: 0,
          mes: "Reset mật khẩu thành công.",
        });
      } else {
        resolve({
          err: 1,
          mes: "Reset token invalid",
        });
      }
    } catch (error) {
      reject(error);
    }
  });

export const forgotPassword = (email) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email });
      if (user) {
        const token = crypto.randomBytes(32).toString("hex");
        const subject = "Reset mật khẩu";
        const html = `Xin vui lòng click vào link dưới đây để hoàn tất reset mật khẩu.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.CLIENT_URL}/reset-mat-khau/${token}>Click here</a>`;
        user.resetPasswordToken = token;
        user.resetPasswordExpiry = Date.now() + 15 * 60 * 1000;
        await user.save();
        resolve({
          err: 0,
          mes: "Vui lòng check mail của bạn.",
        });
        await sendMail({ email, html, subject });
      } else {
        resolve({
          err: 1,
          mes: "Email không đúng",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
