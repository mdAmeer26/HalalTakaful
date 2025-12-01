const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  policyNumber: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'expired', 'cancelled'],
    default: 'pending'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  monthlyContribution: {
    type: Number,
    required: true
  },
  // Takaful Contribution Structure
  tabarruAmount: {
    type: Number,
    required: true
  },
  wakalahFee: {
    type: Number,
    required: true
  },
  wakalahPercentage: {
    type: Number,
    default: 10
  },
  mudarabahShare: {
    type: Number,
    default: 0
  },
  coverage: {
    type: Number,
    required: true
  },
  nextPaymentDate: {
    type: Date,
    required: true
  },
  beneficiaries: [{
    name: String,
    relationship: String,
    percentage: Number
  }],
  documents: [{
    name: String,
    url: String,
    uploadedAt: Date
  }]
}, {
  timestamps: true
});

// Generate policy number before saving
policySchema.pre('save', async function(next) {
  if (!this.policyNumber) {
    const year = new Date().getFullYear();
    const random = Math.floor(100000 + Math.random() * 900000);
    this.policyNumber = `HT-${year}-${random}`;
  }
  next();
});

module.exports = mongoose.model('Policy', policySchema);
