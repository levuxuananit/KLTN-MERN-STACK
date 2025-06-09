import mongoose from 'mongoose';
import uniqid from 'uniqid';

const LabelSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: () => uniqid() },
  code: String,
  value: String,
}, { timestamps: true });

const Label = mongoose.models.Label || mongoose.model('Label', LabelSchema);

export default Label;
