import mongoose from 'mongoose';
import uniqid from 'uniqid';

const CommentSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: () => uniqid() }, // Custom ID using uniqid
  uid: { type: String, ref: 'User' },
  content: String,
  pid: { type: String, ref: 'Post' },
  parentComment: { type: String, ref: 'Comment' },
}, { timestamps: true });

const Comment = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);

export default Comment;
