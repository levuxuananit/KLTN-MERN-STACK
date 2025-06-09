import mongoose from 'mongoose';
import uniqid from 'uniqid';

const WishlistSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: () => uniqid() },
  uid: { type: String, ref: 'User' }, // Changed to String
  pid: { type: String, ref: 'Post' }, // Changed to String
}, { timestamps: true });

const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema);

export default Wishlist;
