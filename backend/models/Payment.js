const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  policy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Policy',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Please provide payment amount'],
    min: [0, 'Amount cannot be negative']
  },
  // Takaful Contribution Breakdown
  tabarruAmount: {
    type: Number,
    required: [true, 'Please provide Tabarru amount'],
    min: [0, 'Tabarru cannot be negative']
  },
  wakalahFee: {
    type: Number,
    required: [true, 'Please provide Wakalah fee'],
    min: [0, 'Wakalah fee cannot be negative']
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'bank_transfer', 'wallet'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  periodCovered: {
    startDate: Date,
    endDate: Date
  },
  metadata: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

// Generate transaction ID before saving
paymentSchema.pre('save', async function(next) {
  if (!this.transactionId) {
    const timestamp = Date.now();
    const random = Math.floor(1000 + Math.random() * 9000);
    this.transactionId = `TXN-${timestamp}-${random}`;
  }
  next();
});

module.exports = mongoose.model('Payment', paymentSchema);
