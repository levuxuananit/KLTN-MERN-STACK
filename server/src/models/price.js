import mongoose from 'mongoose';
import uniqid from 'uniqid';

const PriceSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: () => uniqid() },
  code: String,
  order: Number,
  value: String
}, { timestamps: true });

const Price = mongoose.model('Price', PriceSchema);

export default Price;