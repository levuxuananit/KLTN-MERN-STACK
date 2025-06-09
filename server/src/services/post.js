import Post from "../models/post.js";
import generateCode from "../ultis/generateCode.js";
import generateDate from "../ultis/generateDate.js";
import Attribute from "../models/attribute.js";
import moment from "moment";
import Overview from "../models/overview.js";
import Image from "../models/image.js";
import Report from "../models/report.js";
import User from "../models/user.js";
import Expired from "../models/expired.js";
import Wishlist from "../models/wishlist.js";
import Province from "../models/province.js";
import Label from "../models/label.js";
export const getPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await Post.find()
        .populate({
          path: "imagesId",
          foreignField: "id", // Match by 'id'
          select: "id image", // Select specific fields
          strictPopulate: false,
        })
        .populate({
          path: "attributesId",
          foreignField: "id", // Match by 'id'
          select: "id price acreage published hashtag",
          strictPopulate: false,
        })
        .populate({
          path: "userId",
          foreignField: "id", // Match by 'id'
          select: "id name zalo phone",
          strictPopulate: false,
        })
        .populate({
          path: "votes",
          foreignField: "id",
          populate: {
            path: "uid",
            foreignField: "id",
            select: "id name avatar",
            strictPopulate: false,
          },
          strictPopulate: false,
        })
        .populate([
          {
            path: "comments",
            foreignField: "id",
            select: "id content",
            populate: {
              path: "uid",
              foreignField: "id",
              select: "id name avatar",
              strictPopulate: false,
            },
            strictPopulate: false,
          },
        ])
        .select("id title star address description") // Select Post fields
        .lean();

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting posts is failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getPostById = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await Post.findOne({ id: pid }) // Query by custom 'id'
        .populate({
          path: "imagesId",
          foreignField: "id", // Match by 'id'
          select: "id image",
          strictPopulate: false,
        })
        .populate({
          path: "attributesId",
          foreignField: "id",
          select: "id price acreage published hashtag",
          strictPopulate: false,
        })
        .populate({
          path: "userId",
          foreignField: "id",
          select: "id name zalo phone",
          strictPopulate: false,
        })
        .populate({
          path: "overviewId",
          foreignField: "id",
          strictPopulate: false,
        })
        .populate({
          path: "labelCode",
          foreignField: "code",
          strictPopulate: false,
        })
        .populate({
          path: "votes",
          foreignField: "id",
          populate: {
            path: "uid",
            foreignField: "id",
            select: "id name avatar",
            strictPopulate: false,
          },
          strictPopulate: false,
        })
        .populate({
          path: "comments",
          foreignField: "id",
          populate: {
            path: "uid",
            foreignField: "id",
            select: "id name avatar",
            strictPopulate: false,
          },
          strictPopulate: false,
        })
        .lean();

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting post by ID failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getPostsLimitService = async (
  page,
  { limitPost, order, ...query },
  { priceNumber, areaNumber }
) => {
  try {
    let offset = !page || +page <= 1 ? 0 : +page - 1;
    const limit = +limitPost || +process.env.LIMIT;
    const queries = { ...query };

    if (priceNumber)
      queries.priceNumber = { $gte: priceNumber[0], $lte: priceNumber[1] };
    if (areaNumber)
      queries.areaNumber = { $gte: areaNumber[0], $lte: areaNumber[1] };
    // if (order) queries.order = order;

    const response = await Post.find(queries)
      .skip(offset * limit)
      .limit(limit)
      .populate({
        path: "imagesId",
        foreignField: "id", // Match by 'id'
        select: "id image", // Select specific fields
        strictPopulate: false,
      })
      .populate({
        path: "attributesId",
        foreignField: "id",
        select: "id price acreage published hashtag",
        strictPopulate: false,
      })
      .populate({
        path: "userId",
        select: "name zalo phone",
        foreignField: "id", // Match by 'id'
        strictPopulate: false,
      })
      .populate({
        path: "overviewsId",
        foreignField: "id", // Match by 'id'
        strictPopulate: false,
      })
      .populate({
        path: "labelCode",
        select: "-createdAt -updatedAt",
        foreignField: "id", // Match by 'id'
        strictPopulate: false,
      })
      .populate({
        path: "categoryCode",
        select: "code value",
        foreignField: "id", // Match by 'id'
        strictPopulate: false,
      })
      .lean();
    // { path: "lovers", select: "id" },
    //   .sort(order ? { createdAt: order } : { createdAt: -1 });

    return {
      err: response ? 0 : 1,
      msg: response ? "OK" : "Getting posts failed.",
      response,
    };
  } catch (error) {
    throw error;
  }
};

// Service: Get new posts
export const getNewPostService = async () => {
  try {
    const response = await Post.find()
      .sort({ createdAt: -1 })
      .limit(+process.env.LIMIT)
      .populate({
        path: "imagesId",
        foreignField: "id", // Match by 'id'
        select: "id image", // Select specific fields
        strictPopulate: false,
      })
      .populate({
        path: "attributesId",
        foreignField: "id", // Match by 'id'
        select: "id price acreage published hashtag",
        strictPopulate: false,
      })
      .populate({
        path: "userId",
        foreignField: "id", // Match by 'id'
        select: "id name zalo phone",
        strictPopulate: false,
      })
      .populate({
        path: "votes",
        foreignField: "id",
        populate: {
          path: "uid",
          foreignField: "id",
          select: "id name avatar",
          strictPopulate: false,
        },
        strictPopulate: false,
      })
      .populate([
        {
          path: "comments",
          foreignField: "id",
          select: "id content",
          populate: {
            path: "uid",
            foreignField: "id",
            select: "id name avatar",
            strictPopulate: false,
          },
          strictPopulate: false,
        },
      ])
      .select("id title star address description") // Select Post fields
      .lean();

    return {
      err: response ? 0 : 1,
      msg: response ? "OK" : "Getting posts failed.",
      response,
    };
  } catch (error) {
    throw error;
  }
};
import makeid from "uniqid";
// Service: Create new post
export const createNewPostService = async (body, userId) => {
  try {
    const attributesId = makeid();
    const imagesId = makeid();
    const overviewId = makeid();
    const labelCode = generateCode(body.label);
    const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`;
    const currentDate = generateDate();

    const newPost = new Post({
      id: makeid(),
      title: body.title,
      expired: body.expired,
      labelCode,
      address: body.address || null,
      attributesId,
      categoryCode: body.categoryCode,
      description: body.description || null,
      userId: userId,
      overviewId,
      imagesId,
      areaCode: body.areaCode || null,
      priceCode: body.priceCode || null,
      provinceCode: body?.province?.includes("Thành phố")
        ? generateCode(body?.province?.replace("Thành phố ", ""))
        : generateCode(body?.province?.replace("Tỉnh ", "")) || null,
      priceNumber: body.priceNumber,
      areaNumber: body.areaNumber,
    });

    await newPost.save();

    const newAttribute = new Attribute({
      id: attributesId,
      price:
        +body.priceNumber < 1
          ? `${+body.priceNumber * 1000000} đồng/tháng`
          : `${body.priceNumber} triệu/tháng`,
      acreage: `${body.areaNumber} m2`,
      published: moment(new Date()).format("DD/MM/YYYY"),
      hashtag,
    });

    await newAttribute.save();

    const newImage = new Image({
      id: imagesId,
      image: body.images,
    });

    await newImage.save();

    const newOverview = new Overview({
      id: overviewId,
      code: hashtag,
      area: body.label,
      type: body?.category,
      target: body?.target,
      bonus: "Tin thường",
      created: currentDate.today,
      expired: currentDate.expireDay,
    });

    await newOverview.save();

    const newProvince = await Province.findOneAndUpdate(
      { value: body?.province?.replace("Thành phố ", "") },
      { value: body?.province?.replace("Tỉnh ", "") },
      { upsert: true, new: true }
    );

    const newLabel = await Label.findOneAndUpdate(
      { code: labelCode },
      { code: labelCode, value: body.label },
      { upsert: true, new: true }
    );

    return {
      err: 0,
      msg: "OK",
    };
  } catch (error) {
    throw error;
  }
};

// Service: Update post
export const updatePost = async ({
  postId,
  overviewId,
  imagesId,
  attributesId,
  categoryCode,
  label,
  ...body
}) => {
  try {
    const labelCode = generateCode(label);

    await Post.findOneAndUpdate(
      { id: postId },
      {
        title: body.title,
        labelCode,
        address: body.address || null,
        categoryCode: categoryCode,
        description: JSON.stringify(body.description) || null,
        areaCode: body.areaCode || null,
        priceCode: body.priceCode || null,
        provinceCode: body?.province?.includes("Thành phố")
          ? generateCode(body?.province?.replace("Thành phố ", ""))
          : generateCode(body?.province?.replace("Tỉnh ", "")) || null,
        priceNumber: body.priceNumber,
        areaNumber: body.areaNumber,
      }
    );

    await Attribute.findOneAndUpdate(
      { id: attributesId.id },
      {
        price:
          +body.priceNumber < 1
            ? `${+body.priceNumber * 1000000} đồng/tháng`
            : `${body.priceNumber} triệu/tháng`,
        acreage: `${body.areaNumber} m2`,
      }
    );

    await Image.findOneAndUpdate(
      { id: imagesId },
      {
        image: JSON.stringify(body.images),
      }
    );

    await Overview.findOneAndUpdate(
      { id: overviewId.id },
      {
        area: label,
        type: body?.category,
        target: body?.target,
      }
    );

    await Province.findOneAndUpdate(
      { value: body?.province?.replace("Thành phố ", "") },
      { value: body?.province?.replace("Tỉnh ", "") },
      { upsert: true, new: true }
    );

    await Label.findOneAndUpdate(
      { code: labelCode },
      { code: labelCode, value: label },
      { upsert: true, new: true }
    );

    return {
      err: 0,
      msg: "Updated",
    };
  } catch (error) {
    throw error;
  }
};

// Service: Delete post
export const deletePost = async (postId) => {
  try {
    const response = await Post.deleteOne({ id: postId });

    return {
      err: response.deletedCount > 0 ? 0 : 1,
      msg: response.deletedCount > 0 ? "Delete" : "No post delete.",
    };
  } catch (error) {
    throw error;
  }
};

// Service: Get wishlist
export const getWishlist = async ({ uid }) => {
  try {
    const response = await Wishlist.find({ uid })
      .populate({ path: "uid", select: "name zalo phone", foreignField: "id" })
      .populate({
        path: "pid",
        foreignField: "id",
        populate: [
          {
            path: "attributesId",
            foreignField: "id",
            strictPopulate: false,
          },
          {
            path: "userId",
            foreignField: "id",
            strictPopulate: false,
          },
          {
            path: "overviewId",
            foreignField: "id",
            strictPopulate: false,
          },
          {
            path: "imagesId",
            foreignField: "id",
            select: "id image",
            strictPopulate: false,
          },
        ],
      });

    return {
      err: response ? 0 : 1,
      msg: response ? "OK" : "Getting posts failed.",
      response,
    };
  } catch (error) {
    throw error;
  }
};

// Service: Report post
export const reportPost = async ({ pid, reason, title, uid }) => {
  try {
    // Create a new report using Mongoose
    const response = await Report.create({
      pid,
      reason,
      title,
      uid,
      seen: false, // Set default value if 'seen' should be false initially
      status: "Pending", // Set default status if needed
    });

    return {
      err: 0,
      data: "Đã gửi báo cáo vi phạm cho bài đăng này",
    };
  } catch (error) {
    return {
      err: 1,
      data: "Something went wrong",
      error: error.message,
    };
  }
};
// Service: Expired posts
export const expiredPostService = async () => {
  try {
    const currentDate = moment().toDate();

    // Tìm các bài đăng đã hết hạn
    const expiredPosts = await Post.find({
      expired: { $lt: currentDate }, // So sánh với ngày hiện tại
    })
      .populate([
        { path: "images", select: "image" },
        { path: "attributes", select: "price acreage published hashtag" },
        { path: "user", select: "name zalo phone" },
        { path: "overviews" },
        { path: "labelData", select: "-createdAt -updatedAt" },
        { path: "category", select: "code value" },
        { path: "lovers", select: "id" },
      ])
      .sort({ expired: -1 }); // Sắp xếp theo ngày hết hạn

    return {
      err: expiredPosts ? 0 : 1,
      msg: expiredPosts ? "OK" : "No expired posts found.",
      response: expiredPosts,
    };
  } catch (error) {
    throw error;
  }
};

// Service: Get post by ID
export const getPostByIdService = async (postId) => {
  try {
    const post = await Post.findById(postId)
      .populate([
        { path: "images", select: "image" },
        { path: "attributes", select: "price acreage published hashtag" },
        { path: "user", select: "name zalo phone" },
        { path: "overviews" },
        { path: "labelData", select: "-createdAt -updatedAt" },
        { path: "category", select: "code value" },
        { path: "lovers", select: "id" },
      ])
      .exec();

    if (!post) {
      return {
        err: 1,
        msg: "Post not found.",
      };
    }

    return {
      err: 0,
      msg: "OK",
      response: post,
    };
  } catch (error) {
    throw error;
  }
};

// Service: Add post to wishlist
export const addToWishlist = async (userId, postId) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return {
        err: 1,
        msg: "Post not found.",
      };
    }

    // Kiểm tra xem bài viết đã có trong wishlist chưa
    const existingWishlist = await Wishlist.findOne({ uid: userId });
    if (existingWishlist) {
      const isPostAlreadyInWishlist = existingWishlist.wishlistData.some(
        (post) => post.toString() === postId
      );
      if (isPostAlreadyInWishlist) {
        return {
          err: 1,
          msg: "Post is already in wishlist.",
        };
      }
    }

    // Nếu chưa có thì thêm bài viết vào wishlist
    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { uid: userId },
      { $push: { wishlistData: postId } },
      { new: true, upsert: true }
    );

    return {
      err: 0,
      msg: "Post added to wishlist.",
      response: updatedWishlist,
    };
  } catch (error) {
    throw error;
  }
};

// Service: Remove post from wishlist
export const removeFromWishlist = async (userId, postId) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return {
        err: 1,
        msg: "Post not found.",
      };
    }

    // Xóa bài viết khỏi wishlist
    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { uid: userId },
      { $pull: { wishlistData: postId } },
      { new: true }
    );

    if (!updatedWishlist) {
      return {
        err: 1,
        msg: "Wishlist not found.",
      };
    }

    return {
      err: 0,
      msg: "Post removed from wishlist.",
      response: updatedWishlist,
    };
  } catch (error) {
    throw error;
  }
};

// Service: Get expired posts for notifications (or auto-deletion)
export const expiredPostNotificationService = async () => {
  try {
    const currentDate = moment().toDate();
    const expiredPosts = await Post.find({
      expired: { $lt: currentDate },
      status: { $ne: "archived" }, // Chỉ chọn những bài đăng chưa được lưu trữ
    });

    return {
      err: expiredPosts.length > 0 ? 0 : 1,
      msg: expiredPosts.length > 0 ? "OK" : "No expired posts.",
      response: expiredPosts,
    };
  } catch (error) {
    throw error;
  }
};

export const getReports = async (
  { page = 1, limit, order, user, ...query },
  uid
) => {
  try {
    const queries = {};
    const step = page - 1;
    const lim = +limit || +process.env.LIMIT_ADMIN;
    queries.skip = step * lim;
    queries.limit = lim;

    // Handling sorting (order by default is in ascending, descending if '-order')
    const sortOrder = order
      ? { [order.replace("-", "")]: order.startsWith("-") ? -1 : 1 }
      : {};

    // Apply filtering for user if provided
    if (user) {
      query.uid = uid;
      query.seen = false;
    }
    // Find reports with pagination and sorting, and populate Post and User references
    const response = await Report.find({uid : uid})
      // .sort(sortOrder)
      // .skip(queries.skip)
      .limit(queries.limit)
      .populate({
        path: "pid",
        select: "id title",
        foreignField: "id",
        populate: {
          path: "userId",
          select: "id name",
          foreignField: "id",
          model: "User",
          strictPopulate: false,
        },

        model: "Post",
        strictPopulate: false,
      })
      .populate({
        path: "uid",
        select: "id name",
        foreignField: "id",
        strictPopulate: false,
      });
    // .exec();

    const totalReports = await Report.countDocuments(query);

    return {
      err: 0,
      data: { count: totalReports, rows: response },
    };
  } catch (error) {
    throw error;
  }
};
export const getReportsAdmin = async (
  { page = 1, limit, order, user, ...query },
  uid
) => {
  try {
    const queries = {};
    const step = page - 1;
    const lim = +limit || +process.env.LIMIT_ADMIN;
    queries.skip = step * lim;
    queries.limit = lim;

    // Handling sorting (order by default is in ascending, descending if '-order')
    const sortOrder = order
      ? { [order.replace("-", "")]: order.startsWith("-") ? -1 : 1 }
      : {};

    // Apply filtering for user if provided
    if (user) {
      query.uid = uid;
      query.seen = false;
    }
    // Find reports with pagination and sorting, and populate Post and User references
    const response = await Report.find()
      // .sort(sortOrder)
      // .skip(queries.skip)
      .limit(queries.limit)
      .populate({
        path: "pid",
        select: "id title",
        foreignField: "id",
        populate: {
          path: "userId",
          select: "id name",
          foreignField: "id",
          model: "User",
          strictPopulate: false,
        },

        model: "Post",
        strictPopulate: false,
      })
      .populate({
        path: "uid",
        select: "id name",
        foreignField: "id",
        strictPopulate: false,
      });
    // .exec();

    const totalReports = await Report.countDocuments(query);

    return {
      err: 0,
      data: { count: totalReports, rows: response },
    };
  } catch (error) {
    throw error;
  }
};

export const getExpireds = async ({ page, limit, order, ...query }) => {
  try {
    const step = !page ? 0 : +page - 1;
    const lim = +limit || +process.env.LIMIT_ADMIN;

    // Sorting order
    const sortOrder = order ? { [order]: 1 } : {};

    const response = await Expired.find(query)
      .populate({
        path: "pid",
        select: "id title expired",
        model: "Post",
        foreignField: "id",
      }) // Populate Post data
      .populate({
        path: "uid",
        select: "id name avatar phone",
        model: "User",
        foreignField: "id",
      }) // Populate User data
      .sort(sortOrder)
      .skip(step * lim)
      .limit(lim)
      .exec();

    const totalCount = await Expired.countDocuments(query); // Total count of matching documents

    return {
      err: response.length > 0 ? 0 : 1,
      data:
        response.length > 0
          ? { items: response, totalCount }
          : "Something went wrong",
    };
  } catch (error) {
    throw error;
  }
};

export const updateReport = ({ rid, status, pid }) =>
  new Promise(async (resolve, reject) => {
    try {
      // Update the status of the report using Mongoose's `findByIdAndUpdate`
      const report = await Report.findOneAndUpdate(
        { id: rid },
        { status },
        { new: true } // This option returns the modified document
      );

      if (!report) {
        return reject(new Error("Report not found"));
      }

      // If the status is 'Accepted', delete the related post
      if (status === "Accepted") {
        const post = await Post.findOneAndDelete({ id: pid });
        if (!post) {
          return reject(new Error("Post not found"));
        }
      }

      resolve({
        err: 0,
        data: "Report status updated successfully, and post deleted if Accepted",
      });
    } catch (error) {
      reject({
        err: 1,
        msg: "Something went wrong: " + error.message,
      });
    }
  });

export const deleteReport = (rid) =>
  new Promise(async (resolve, reject) => {
    try {
      // Delete the report by its ID using Mongoose's `findByIdAndDelete`
      const report = await Report.findOneAndDelete({ id: rid });

      // If no report is found, return an error
      if (!report) {
        return reject({
          err: 1,
          data: "Report not found or already deleted",
        });
      }

      resolve({
        err: 0,
        data: "Report has been deleted successfully",
      });
    } catch (error) {
      reject({
        err: 1,
        msg: "Something went wrong: " + error.message,
      });
    }
  });

export const updateWishlist = ({ pid, uid }) =>
  new Promise(async (resolve, reject) => {
    try {
      // Check if the item already exists in the wishlist
      const already = await Wishlist.findOne({ pid, uid });

      if (already) {
        // If the item is already in the wishlist, remove it (equivalent to `destroy` in Sequelize)
        const response = await Wishlist.deleteOne({ pid, uid });

        resolve({
          err: response.deletedCount > 0 ? 0 : 1,
          msg:
            response.deletedCount > 0
              ? "Removed from your wishlist"
              : "Something went wrong",
        });
      } else {
        // If the item is not in the wishlist, add it (equivalent to `create` in Sequelize)
        const response = await Wishlist.create({ pid, uid });

        resolve({
          err: response ? 0 : 1,
          msg: response ? "Added to your wishlist" : "Something went wrong",
        });
      }
    } catch (error) {
      reject({
        err: 1,
        msg: "Something went wrong: " + error.message,
      });
    }
  });
export const getPostsLimitAdminService = (page, id, { status, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      const queries = { ...query, userId: id };

      // Expired status conditions
      if (+status === 2) queries.expired = { $lt: new Date() };
      if (+status === 1) queries.expired = { $gte: new Date() };

      // Fetching the count and paginated results
      const response = await Post.find(queries)
        .skip(offset * +process.env.LIMIT)
        .limit(+process.env.LIMIT)
        .sort({ createdAt: -1 })
        .populate({
          path: "imagesId",
          foreignField: "id", // Match by 'id'
          select: "id image", // Select specific fields
          strictPopulate: false,
        })
        .populate({
          path: "attributesId",
          foreignField: "id",
          select: "id price acreage published hashtag",
          strictPopulate: false,
        })
        .populate({
          path: "userId",
          select: "name zalo phone",
          foreignField: "id", // Match by 'id'
          strictPopulate: false,
        })
        .populate({
          path: "overviewId",
          select: "id code area type target bonus created expired",
          foreignField: "id", // Match by 'id'
          strictPopulate: false,
        })
        .populate({
          path: "labelCode",
          select: "-createdAt -updatedAt",
          foreignField: "id", // Match by 'id'
          strictPopulate: false,
        })
        .populate({
          path: "categoryCode",
          select: "code value",
          foreignField: "id", // Match by 'id'
          strictPopulate: false,
        })
        .lean();

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting posts failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const updatePostRented = ({ id, status }) =>
  new Promise(async (resolve, reject) => {
    try {
      // Update the post with the provided status
      const response = await Post.findOneAndUpdate(
        { id }, // Find post by custom `id` field
        { status }, // Update the status
        { new: true } // Return the updated document
      );

      resolve({
        err: response ? 0 : 1,
        data: response ? "Đã cập nhật" : "Something went wrong",
      });
    } catch (error) {
      reject(error);
    }
  });
export const requestExpired = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await Expired.create({ ...data, status: "Pending" });
      resolve({
        err: response ? 0 : 1,
        msg: response
          ? `Đã gửi yêu cầu gia hạn. Chủ trọ hãy liên hệ admin thanh toán số tiền gia hạn đã đăng ký nha~`
          : "Something went wrong",
      });
    } catch (error) {
      reject(error);
    }
  });

export const plusExpired = ({ pid, days, status, eid }) =>
  new Promise(async (resolve, reject) => {
    try {
      const newExpiryDate = new Date(
        Date.now() + Number(days) * 24 * 3600 * 1000
      );
      console.log(newExpiryDate)
      // Updating both Post and Expired documents simultaneously
      const [postResponse, expiredResponse] = await Promise.all([
        Post.findOneAndUpdate({id : pid}, { expired: newExpiryDate }), // Update expiration date for the post
        Expired.findOneAndUpdate({id : eid}, { status }), // Update status for the Expired entry
      ]);

      const postUpdated = postResponse !== null;
      const expiredUpdated = expiredResponse !== null;

      resolve({
        err: postUpdated && expiredUpdated ? 0 : 1,
        msg:
          postUpdated && expiredUpdated
            ? `Đã gia hạn thêm ${days} ngày cho bài đăng tính từ ngày ${new Date().toLocaleDateString()}`
            : "Không thể gia hạn bài đăng.",
      });
    } catch (error) {
      reject(error);
    }
  });

  export const seenReport = (uid) => new Promise(async (resolve, reject) => {
    try {
      const response = await Report.updateMany({ uid : uid }, { seen: true });
  
      resolve({
        err: response.nModified > 0 ? 0 : 1,
        data: response.nModified > 0 ? 'Đã xóa bài đăng vi phạm' : 'Something went wrong',
      });
    } catch (error) {
      reject(error);
    }
  });
  
