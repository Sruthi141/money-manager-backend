const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  division: {
    type: String,
    enum: ['office', 'personal'],
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);
