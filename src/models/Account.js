const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  balance: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    enum: ['cash', 'bank', 'credit_card', 'wallet'],
    default: 'bank'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Account', accountSchema);
