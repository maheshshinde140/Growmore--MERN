import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  referral: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('user', userSchema);
