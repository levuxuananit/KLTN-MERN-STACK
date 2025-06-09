import mongoose from 'mongoose';
import uniqid from 'uniqid';

const RoleSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: () => uniqid() },
  code: String,
  value: String,
}, { timestamps: true });

const Role = mongoose.models.Role || mongoose.model('Role', RoleSchema);

export default Role;
