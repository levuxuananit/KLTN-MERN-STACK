import mongoose from 'mongoose';
import uniqid from 'uniqid';

const ExpiredSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: () => uniqid() },
  pid: { type: String, ref: 'Post' }, // Updated to String
  uid: { type: String, ref: 'User' }, // Updated to String
  price: Number,
  days: Number,
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Cancelled'],
  },
}, { timestamps: true });

const Expired = mongoose.models.Expired || mongoose.model('Expired', ExpiredSchema);

export default Expired;
