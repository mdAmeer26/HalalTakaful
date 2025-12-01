const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide plan name'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please provide plan description']
  },
  type: {
    type: String,
    enum: ['health', 'life', 'auto', 'property'],
    required: [true, 'Please specify plan type']
  },
  monthlyContribution: {
    type: Number,
    required: [true, 'Please provide monthly contribution amount'],
    min: [0, 'Contribution cannot be negative']
  },
  // Takaful Structure: Contribution Breakdown
  tabarruAmount: {
    type: Number,
    required: [true, 'Please provide Tabarru (donation) amount'],
    min: [0, 'Tabarru cannot be negative']
  },
  wakalahFee: {
    type: Number,
    required: [true, 'Please provide Wakalah (service) fee'],
    min: [0, 'Wakalah fee cannot be negative']
  },
  wakalahPercentage: {
    type: Number,
    required: [true, 'Please provide Wakalah percentage'],
    min: [0, 'Wakalah percentage cannot be negative'],
    max: [100, 'Wakalah percentage cannot exceed 100']
  },
  mudarabahShare: {
    type: Number,
    default: 0,
    min: [0, 'Mudarabah share cannot be negative'],
    max: [100, 'Mudarabah share cannot exceed 100']
  },
  coverage: {
    type: Number,
    required: [true, 'Please provide coverage amount'],
    min: [0, 'Coverage cannot be negative']
  },
  benefits: [{
    type: String
  }],
  features: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  shariahCertified: {
    type: Boolean,
    default: true
  },
  investmentDetails: {
    type: String,
    default: 'Invested in Shariah-compliant avenues only (No interest, no haram industries)'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);
