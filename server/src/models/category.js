import mongoose from 'mongoose';
import uniqid from 'uniqid';

const CategorySchema = new mongoose.Schema({
  id: { type: String, unique: true, default: () => uniqid() }, // Custom ID using uniqid
  code: String,
  value: String,
  header: String,
  subheader: String,
}, { timestamps: true });
// PostSchema.set("code", true)
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default Category;
