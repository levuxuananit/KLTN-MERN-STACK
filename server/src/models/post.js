import mongoose from "mongoose";
import uniqid from "uniqid";

const PostSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, default: () => uniqid() }, // Custom ID using uniqid
    title: String,
    star: String,
    labelCode: String, // Updated to String
    address: String,
    attributesId: { type: String, ref: "Attribute" }, // Updated to String
    categoryCode: String, // Updated to String
    priceCode: String,
    areaCode: String,
    provinceCode: String,
    description: {
      type: String,
      get: function (data) {
        try {
          return JSON.parse(data);
        } catch (error) {
          return data;
        }
      },
      set: function (data) {
        return JSON.stringify(data);
      },
    },
    userId: { type: String, ref: "User" }, // Updated to String
    overviewId: { type: String, ref: "Overview" }, // Updated to String
    imagesId: { type: String, ref: "Image" }, // Updated to String
    votes: [{ type: String, ref: "Vote" }], // Liên kết tới Vote
    comments: [{ type: String, ref: "Comment" }], // Liên kết tới Comment
    priceNumber: Number,
    areaNumber: Number,
    expired: Date,
    status: {
      type: String,
      enum: ["ACTIVE", "RENTED"],
    },
  },
  { timestamps: true }
);
PostSchema.set("id", true);
const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
