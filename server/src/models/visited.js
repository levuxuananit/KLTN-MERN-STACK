import mongoose from 'mongoose';
import uniqid from 'uniqid';

const VisitedSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: () => uniqid() },
  uid: { type: String, ref: 'User' }, // Changed to String
  times: Number,
}, { timestamps: true });

const Visited = mongoose.models.Visited || mongoose.model('Visited', VisitedSchema);

export default Visited;
