import mongoose from 'mongoose';
import uniqid from 'uniqid';

const AreaSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: () => uniqid() }, // Custom ID using uniqid
  code: String,
  order: Number,
  value: String,
}, { timestamps: true });

const Area = mongoose.models.Area || mongoose.model('Area', AreaSchema);

export default Area;
