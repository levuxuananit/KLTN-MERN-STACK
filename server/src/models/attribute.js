import mongoose from 'mongoose';
import uniqid from 'uniqid';

const AttributeSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: () => uniqid() }, // Custom ID using uniqid
  price: String,
  acreage: String,
  published: String,
  hashtag: String,
}, { timestamps: true });

const Attribute = mongoose.models.Attribute || mongoose.model('Attribute', AttributeSchema);

export default Attribute;
