import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['income', 'expense'],
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
  category: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true,
    enum: ['Office', 'Personal'],
  },
  account: {
    type: String,
    required: true,
    enum: ['Cash', 'Bank', 'Wallet'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Transaction', transactionSchema);
