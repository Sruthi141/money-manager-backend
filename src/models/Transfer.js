import mongoose from 'mongoose';

const transferSchema = new mongoose.Schema({
  fromAccount: {
    type: String,
    required: true,
    enum: ['Cash', 'Bank', 'Wallet'],
  },
  toAccount: {
    type: String,
    required: true,
    enum: ['Cash', 'Bank', 'Wallet'],
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    default: '',
  },
  transferDate: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Transfer', transferSchema);
