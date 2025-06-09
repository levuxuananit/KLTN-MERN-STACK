import mongoose from 'mongoose';
import uniqid from 'uniqid';

const VoteSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: () => uniqid() },
  uid: { type: String, ref: 'User' }, // Changed to String
  pid: { type: String, ref: 'Post' }, // Changed to String
  score: Number,
  comment: String,
}, { timestamps: true });

const Vote = mongoose.models.Vote || mongoose.model('Vote', VoteSchema);

export default Vote;
