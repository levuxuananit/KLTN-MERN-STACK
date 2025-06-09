import mongoose from 'mongoose';
import uniqid from 'uniqid';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: () => uniqid() },
  name: String,
  email: String,
  password: String,
  role: { type: String, ref: 'Role' }, // Changed to String
  phone: String,
  zalo: String,
  fbUrl: String,
  avatar: String,
  resetPasswordToken: String,
  resetPasswordExpiry: Date,
}, { timestamps: true });

UserSchema.pre('save', function (next) {
  if (this.isModified('resetPasswordToken') && this.resetPasswordToken) {
    this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(this.resetPasswordToken)
      .digest('hex');
  }
  next();
});
UserSchema.set("id", true)

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
