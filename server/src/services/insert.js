import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import chothuematbang from "../../data/chothuematbang.json" assert { type: "json" };
import chothuecanho from "../../data/chothuecanho.json" assert { type: "json" };
import nhachothue from "../../data/nhachothue.json" assert { type: "json" };
import chothuephongtro from "../../data/chothuephongtro.json" assert { type: "json" };
import generateCode from "../ultis/generateCode.js";
import { dataPrice, dataArea } from "../ultis/data.js";
import { getNumberFromString, getNumberFromStringV2 } from "../ultis/common.js";
import dotenv from "dotenv"; // Import models from a central file that exports all schemas
import * as db from "../models/index.js";
import Post from '../models/post.js'; 
import Label from "../models/label.js";
import Province from "../models/province.js";
dotenv.config();
import makeid from "uniqid";
// Connect to MongoDB
const uri = process.env.MONGODB_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
const dataBody = [
  { body: chothuephongtro.body, code: "CTPT" },
  { body: chothuematbang.body, code: "CTMB" },
  { body: chothuecanho.body, code: "CTCH" },
  { body: nhachothue.body, code: "NCT" },
];

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const insertService = async () => {
    try {
      await connectDB();
      const provinceCodes = [];
      const labelCodes = [];
  
      for (const cate of dataBody) {
        for (const item of cate.body) {
          const labelCode = generateCode(item?.header?.class?.classType).trim();
          const provinceCode = generateCode(
            item?.header?.address?.split(",")?.slice(-1)[0]
          ).trim();
  
          // Avoid duplicates
          if (!labelCodes.some((l) => l.code === labelCode)) {
            labelCodes.push({
              code: labelCode,
              value: item?.header?.class?.classType?.trim(),
            });
          }
          if (!provinceCodes.some((p) => p.code === provinceCode)) {
            provinceCodes.push({
              code: provinceCode,
              value: item?.header?.address?.split(",")?.slice(-1)[0].trim(),
            });
          }
  
          const currentArea = getNumberFromString(item?.header?.attributes?.acreage);
          const currentPrice = getNumberFromString(item?.header?.attributes?.price);
  
          // Create new documents using Mongoose models
          const post = new Post({  // Correct usage of Post model
            id: makeid(),
            title: item?.header?.title,
            star: item?.header?.star,
            labelCode,
            address: item?.header?.address,
            categoryCode: cate.code,
            description: JSON.stringify(item?.mainContent?.content),
            user: {
              name: item?.contact?.content.find((i) => i.name === "Liên hệ:")?.content,
              password: hashPassword("123456"),
              phone: item?.contact?.content.find((i) => i.name === "Điện thoại:")?.content,
              zalo: item?.contact?.content.find((i) => i.name === "Zalo")?.content,
            },
            attributes: {
              price: item?.header?.attributes?.price,
              acreage: item?.header?.attributes?.acreage,
              published: item?.header?.attributes?.published,
              hashtag: item?.header?.attributes?.hashtag,
            },
            images: {
              image: JSON.stringify(item?.images),
            },
            overview: {
              code: item?.overview?.content.find((i) => i.name === "Mã tin:")?.content,
              area: item?.overview?.content.find((i) => i.name === "Khu vực")?.content,
              type: item?.overview?.content.find((i) => i.name === "Loại tin rao:")?.content,
              target: item?.overview?.content.find((i) => i.name === "Đối tượng thuê:")?.content,
              bonus: item?.overview?.content.find((i) => i.name === "Gói tin:")?.content,
              created: item?.overview?.content.find((i) => i.name === "Ngày đăng:")?.content,
              expired: item?.overview?.content.find((i) => i.name === "Ngày hết hạn:")?.content,
            },
            areaCode: dataArea.find(
              (area) => area.max > currentArea && area.min <= currentArea
            )?.code,
            priceCode: dataPrice.find(
              (area) => area.max > currentPrice && area.min <= currentPrice
            )?.code,
            provinceCode,
            priceNumber: getNumberFromStringV2(item?.header?.attributes?.price),
            areaNumber: getNumberFromStringV2(item?.header?.attributes?.acreage),
          });
  
          await post.save();
        }
      }
  
      // Insert unique provinces and labels
      await Province.insertMany(provinceCodes);
      await Label.insertMany(labelCodes);
  
      console.log("Data insertion completed.");
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

export const createPricesAndAreas = async () => {
  try {
    await Promise.all([
      db.Price.insertMany(
        dataPrice.map((item, index) => ({
          code: item.code,
          value: item.value,
          order: index + 1,
        }))
      ),
      db.Area.insertMany(
        dataArea.map((item, index) => ({
          code: item.code,
          value: item.value,
          order: index + 1,
        }))
      ),
    ]);

    console.log("Prices and areas created successfully.");
  } catch (error) {
    console.error("Error creating prices and areas:", error);
  }
};
