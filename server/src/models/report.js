import mongoose from "mongoose";
import uniqid from "uniqid";

const ReportSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, default: () => uniqid() },
    pid: { type: String, ref: "Post" }, // Changed to String
    reason: String,
    title: String,
    uid: { type: String, ref: "User" }, // Changed to String
    seen: Boolean,
    status: {
      type: String,
      enum: ["Accepted", "Pending", "Canceled"],
    },
  },
  { timestamps: true }
);
ReportSchema.set("id", true);
const Report = mongoose.models.Report || mongoose.model("Report", ReportSchema);

export default Report;
