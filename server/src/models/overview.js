import mongoose from 'mongoose';
import uniqid from 'uniqid';

const OverviewSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: () => uniqid() },
  code: String,
  area: String,
  type: String,
  target: String,
  bonus: String,
  created: String,
  expired: String,
}, { timestamps: true });

const Overview = mongoose.models.Overview || mongoose.model('Overview', OverviewSchema);

export default Overview;
