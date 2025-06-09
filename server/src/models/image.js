import mongoose from 'mongoose';
import uniqid from 'uniqid';

const ImageSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: () => uniqid() },
  image: [{type: String}],
}, { timestamps: true });

const Image = mongoose.models.Image || mongoose.model('Image', ImageSchema);

export default Image;
