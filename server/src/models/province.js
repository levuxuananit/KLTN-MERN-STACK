import mongoose from 'mongoose';
import uniqid from 'uniqid';

const ProvinceSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: () => uniqid() },
  code: String,
  value: String,
}, { timestamps: true });

const Province = mongoose.models.Province || mongoose.model('Province', ProvinceSchema);

export default Province;
