import * as authService from "../services/auth.js";
import asyncHandler from "express-async-handler";
import makeId from "uniqid";
import sendMail from "../services/sendmail.js";
import db from "../models/index.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));
// export const register = async (req, res) => {
//     const { name, phone, password, email } = req.body
//     try {
//         if (!name || !phone || !password || !email) return res.status(400).json({
//             err: 1,
//             msg: 'Missing inputs !'
//         })
//         const response = await authService.registerService(req.body)
//         return res.status(200).json(response)

//     } catch (error) {
//         return res.status(500).json({
//             err: -1,
//             msg: 'Fail at auth controller: ' + error
//         })
//     }
// }
// export const register = asyncHandler(async (req, res) => {
//   const user = await db.User.findOne({ where: { email: req.body.email } });
//   const token = makeId();
//   if (!user) {
//     await db.User.create({
//       email: "notactived",
//       password: hashPassword(req.body.password),
//       name: req.body.name,
//       phone: req.body.phone,
//       zalo: req.body.phone,
//       id: token,
//     });
//   }
//   if (!user) {
//     const subject = "Xác minh email đăng ký";
//     const html = `Xin vui lòng click vào link dưới đây để hoàn tất đăng ký tài khoản của bạn.Link này sẽ hết hạn sau 5 phút kể từ bây giờ. <a href=${process.env.SERVER_URL}/api/v1/auth/finalregister/${req.body.email}/${token}>Click here</a>`;
//     await sendMail({ email: req.body.email, html, subject });
//     setTimeout(async () => {
//       await db.User.destroy({ where: { id: token } });
//     }, [30000]);
//   }
//   return res.json({
//     err: !user ? 0 : 1,
//     msg: user
//       ? "Email đã được đăng ký"
//       : "Hãy check mail để kích hoạt tài khoản",
//   });
// });
export const register = async (req, res) => {
  const { name, phone, password } = req.body
  try {
      if (!name || !phone || !password) return res.status(400).json({
          err: 1,
          msg: 'Missing inputs !'
      })
      const response = await authService.registerService(req.body)
      return res.status(200).json(response)

  } catch (error) {
      return res.status(500).json({
          err: -1,
          msg: 'Fail at auth controller: ' + error
      })
  }
}
export const finalRegister = asyncHandler(async (req, res) => {
  const { token, email } = req.params;
  const response = await db.User.findOne({ where: { id: token }, raw: true });
  if (response) {
    const update = await db.User.update(
      { email, id: makeId() },
      { where: { id: token } }
    );
    if (update[0] > 0)
      res.redirect(`${process.env.CLIENT_URL}/xac-nhan-dang-ky-tai-khoan/1`);
    else {
      await db.User.destroy({ where: { id: token } });
      res.redirect(`${process.env.CLIENT_URL}/xac-nhan-dang-ky-tai-khoan/0`);
    }
  } else {
    await db.User.destroy({ where: { id: token } });
    res.redirect(`${process.env.CLIENT_URL}/xac-nhan-dang-ky-tai-khoan/0`);
  }
});
export const login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    if (!phone || !password)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs !",
      });
    const response = await authService.loginService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
