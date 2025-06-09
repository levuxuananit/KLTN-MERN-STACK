import * as postService from "../services/post.js";
import asyncHandler from "express-async-handler";
import db from "../models/index.js";
import Post from "../models/post.js"; // Import model Post
import Visited from "../models/visited.js"; // Import model Visited
import User from "../models/user.js"; // Import model User
import Vote from "../models/vote.js";
export const getPosts = async (req, res) => {
  try {
    const response = await postService.getPostsService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const getPostsLimit = async (req, res) => {
  const { page, priceNumber, areaNumber, ...query } = req.query;
  try {
    const response = await postService.getPostsLimitService(page, query, {
      priceNumber,
      areaNumber,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const getPostById = async (req, res) => {
  const { pid } = req.query;
  try {
    const response = await postService.getPostById(pid);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const getNewPosts = async (req, res) => {
  try {
    const response = await postService.getNewPostService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const createNewPost = async (req, res) => {
  try {
    const { categoryCode, title, priceNumber, areaNumber, label } = req.body;
    const { id } = req.user;
    if (!categoryCode || !id || !title || !priceNumber || !areaNumber || !label)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    const response = await postService.createNewPostService(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const getPostsLimitAdmin = async (req, res) => {
  const { page, ...query } = req.query;
  const { id } = req.user;
  try {
    if (!id)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    const response = await postService.getPostsLimitAdminService(
      page,
      id,
      query
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const updatePost = async (req, res) => {
  const { postId, overviewId, imagesId, attributesId, categoryCode, label , ...payload } = req.body;
  const { id } = req.user;
  try {
    if (!postId || !id || !overviewId || !imagesId || !attributesId)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    const response = await postService.updatePost(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const deletePost = async (req, res) => {
  const { postId } = req.query;
  const { id } = req.user;
  try {
    if (!postId || !id)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    const response = await postService.deletePost(postId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const plusExpired = async (req, res) => {
  const { pid, eid, status } = req.body;
  try {
    if (!pid || !eid || !status)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    if (!req.body.days) req.body.days = 15;
    const response = await postService.plusExpired(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const plusExpiredPaypal = async (req, res) => {
  const { pid, days } = req.body;
  try {
    if (!pid || !days)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    const response = await postService.plusExpiredPaypal(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const requestExpired = async (req, res) => {
  try {
    const { id } = req.user;
    if (!req.body.pid)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    const days = req.body.days || 15;
    const response = await postService.requestExpired({ ...req.body, uid: id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const ratings = asyncHandler(async (req, res) => {
  const uid = req.user?.id;
  const { pid, score } = req.body;
  if (!uid || !pid || !score) {
    return res.status(400).json({
      err: 1,
      mes: "Missing inputs",
    });
  }
  const alreadyVote = await Vote.findOne({ where: { pid, uid } });

  if (alreadyVote) {
    const response = await Vote.update(req.body, { where: { pid, uid } });
    const post = await Vote.find({ where: { pid }, raw: true });
    if (!post) {
      await Post.findOneAndUpdate({ star: score }, { where: { id: pid } });
    } else {
      const star = post?.reduce((sum, el) => sum + el.score, 0);
      await Post.update(
        { star: Math.round(star / post?.length) },
        { where: { id: pid } }
      );
    }
    return res.json({
      success: response ? true : false,
      data: response ? response : "Cannot ratings",
    });
  } else {
    const response = await Vote.create({ ...req.body, uid });
    const post = await Vote.find({ where: { pid }, raw: true });
    if (!post) {
      await Post.findOneAndUpdate({ star: score }, { where: { id: pid } });
    } else {
      const star = post?.reduce((sum, el) => sum + el.score, 0);
      await Post.findOneAndUpdate(
        { star: Math.round(star / post?.length) },
        { where: { id: pid } }
      );
    }
    return res.json({
      success: response ? true : false,
      data: response ? response : "Cannot ratings",
    });
  }
});
export const updateWishlist = async (req, res) => {
  try {
    const uid = req.user.id;
    const { pid } = req.body;
    if (!uid || !pid)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    const response = await postService.updateWishlist({ pid, uid });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const getWishlist = async (req, res) => {
  try {
    const uid = req.user.id;
    if (!uid)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    const response = await postService.getWishlist({ uid });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const getExpireds = async (req, res) => {
  try {
    const response = await postService.getExpireds(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const reportPost = async (req, res) => {
  try {
    const uid = req?.user?.id;
    const { pid, reason, title } = req.body;
    // req.body.uid = uid;
    if (!reason || !pid || !title || !uid)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    const response = await postService.reportPost(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const getReports = async (req, res) => {
  try {
    const uid = req?.user?.id;
    const response = await postService.getReports(req.query, uid);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};

export const getReportsAdmin = async (req, res) => {
  try {
    const uid = req?.user?.id;
    const response = await postService.getReportsAdmin(req.query, uid);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const updateReport = async (req, res) => {
  try {
    const { rid, status, pid } = req.body;
    if (!status || !rid || !pid)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    const response = await postService.updateReport({ rid, status, pid });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const seenReport = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await postService.seenReport(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const deleteReport = async (req, res) => {
  try {
    if (!req.query.rid)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    const response = await postService.deleteReport(req.query.rid);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};

export const getDashboard = asyncHandler(async (req, res) => {
  const { days, type, from, to } = req.query;
  const daysQuery = days || 220;
  const start = from || Date.now() - daysQuery * 24 * 60 * 60 * 1000;
  const end = to || Date.now();

  const q = {};
  if (from && to) {
    if (from === to)
      q.createdAt = {
        $gte: new Date(`${from} 00:00:00`),
        $lte: new Date(`${from} 23:59:59`),
      };
    else q.createdAt = { $gte: new Date(start), $lte: new Date(end) };
  }

  try {
    const [ctpt, ctmb, ctch, nct, views, postCount, userCount] =
      await Promise.all([
        // Truy vấn cho các danh mục "CTPT"
        Post.aggregate([
          { $match: { ...q, categoryCode: "CTPT" } },
          { $project: { createdAt: { $toDate: "$createdAt" } } }, // Chuyển đổi thành kiểu Date
          {
            $group: {
              _id: {
                $dateToString: { format: "%d-%m-%Y", date: "$createdAt" },
              },
              counter: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ]),
        // Truy vấn cho các danh mục "CTMB"
        Post.aggregate([
          { $match: { ...q, categoryCode: "CTMB" } },
          { $project: { createdAt: { $toDate: "$createdAt" } } },
          {
            $group: {
              _id: {
                $dateToString: { format: "%d-%m-%Y", date: "$createdAt" },
              },
              counter: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ]),
        // Truy vấn cho các danh mục "CTCH"
        Post.aggregate([
          { $match: { ...q, categoryCode: "CTCH" } },
          { $project: { createdAt: { $toDate: "$createdAt" } } },
          {
            $group: {
              _id: {
                $dateToString: { format: "%d-%m-%Y", date: "$createdAt" },
              },
              counter: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ]),
        // Truy vấn cho các danh mục "NCT"
        Post.aggregate([
          { $match: { ...q, categoryCode: "NCT" } },
          { $project: { createdAt: { $toDate: "$createdAt" } } },
          {
            $group: {
              _id: {
                $dateToString: { format: "%d-%m-%Y", date: "$createdAt" },
              },
              counter: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ]),
        // Truy vấn tổng số lượt xem từ model Visited
        Visited.aggregate([
          { $group: { _id: null, views: { $sum: "$times" } } },
        ]),
        // Truy vấn tổng số bài đăng
        Post.aggregate([{ $count: "postCount" }]),
        // Truy vấn tổng số người dùng
        User.aggregate([{ $count: "userCount" }]),
      ]);

    // Trả về kết quả cho client
    return res.json({
      success: true,
      chartData: {
        ctpt,
        ctmb,
        ctch,
        nct,
        views: views[0]?.views || 0,
        postCount: postCount[0]?.postCount || 0,
        userCount: userCount[0]?.userCount || 0,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching dashboard data",
      error: error.message,
    });
  }
});

export const updatePostRented = async (req, res) => {
  try {
    const { pid } = req.params;
    const { status } = req.body;
    if (!status) return res.status(404).json({ err: 1, msg: "Mising" });
    const response = await postService.updatePostRented({ id: pid, status });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};


