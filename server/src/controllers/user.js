import * as services from "../services/user.js";
import asyncHandler from "express-async-handler";
import db from "../models/index.js";
import Role from "../models/role.js";
import User from "../models/user.js";

export const getCurrent = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await services.getOne(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at user controller: " + error,
    });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const payload = req.body;
    if (req.file) req.body.avatar = req.file.path;
    if (!payload)
      return res.status(400).json({
        err: 1,
        msg: "Thiếu payload",
      });
    const response = await services.updateUser(payload, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at user controller: " + error,
    });
  }
};
export const getUsers = asyncHandler(async (req, res) => {
  const { page, limit, offset, order, name, ...query } = req.query;

  // Điều chỉnh bước phân trang
  const step = !page ? 0 : +page - 1;

  // Khởi tạo query
  const queries = {};
  queries.limit = +limit || +process.env.POST_LIMIT; // Giới hạn số lượng bản ghi trả về
  queries.offset = step * queries.limit; // Tính toán offset cho phân trang

  // Thêm điều kiện tìm kiếm cho tên
  if (name) query.name = { $regex: name, $options: "i" }; // Tìm kiếm không phân biệt hoa thường

  // Tìm kiếm người dùng với điều kiện và phân trang
  const users = await User.find(query) // Tìm các bản ghi người dùng theo điều kiện query
    .skip(queries.offset) // Áp dụng phân trang
    .limit(queries.limit) // Giới hạn số lượng bản ghi trả về
    // .populate('roleData', 'value code') // Dùng populate để nối Role (giả sử 'roleData' là tên trường lưu role)
    // .populate('posts', 'id')           // Dùng populate để nối Post (giả sử 'posts' là tên trường lưu bài viết)
    .sort(order ? { [order]: 1 } : {}) // Áp dụng sắp xếp nếu có
    .exec();

  // Đếm số lượng người dùng thỏa mãn query
  const count = await User.countDocuments(query);

  // Trả về kết quả
  return res.json({
    success: users.length > 0,
    users,
    total: count,
    totalPages: Math.ceil(count / queries.limit), // Tính số trang tổng cộng
  });
});
export const getRoles = asyncHandler(async (req, res) => {
  const response = await Role.find();
  return res.json({
    success: response ? true : false,
    roles: response ? response : "Cannot get roles",
  });
});
export const updateUserByAdmin = asyncHandler(async (req, res) => {
    const { uid } = req.params;
  
    // Using `findOneAndUpdate` to update based on `uid` (custom identifier)
    const response = await User.findOneAndUpdate(
      { id : uid },            // Filter by `uid`
      req.body,           // Update with request body
      { new: true }       // Return the updated document
    );
  
    return res.json({
      success: !!response,
      user: response || "Cannot update user",
    });
  });
  
export const deleteUser = asyncHandler(async (req, res) => {
  const { uid } = req.params;

  // Assuming `uid` is a unique identifier in your User schema (not `_id`)
  const response = await User.deleteOne({ id: uid });

  return res.json({
    success: response.deletedCount > 0,
    mes:
      response.deletedCount > 0 ? "Xóa user thành công" : "Cannot delete user",
  });
});

export const forgotPassword = async (req, res) => {
  try {
    if (!req.body || !req.body.email)
      return res.status(200).json({
        err: 1,
        mes: "Missing inputs",
      });
    const response = await services.forgotPassword(req.body.email);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Lỗi server " + error,
    });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password)
      return res.status(200).json({
        err: 1,
        mes: "Missing inputs",
      });
    const response = await services.resetPassword({ password, token });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Lỗi server " + error,
    });
  }
};
