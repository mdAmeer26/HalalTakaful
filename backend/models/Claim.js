const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  claimNumber: {
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
  type: {
    type: String,
    enum: ['health', 'life', 'auto', 'property'],
    required: true
  },
  description: {
    type: String,
    required: [true, 'Please provide claim description']
  },
  amount: {
    type: Number,
    required: [true, 'Please provide claim amount'],
    min: [0, 'Amount cannot be negative']
  },
  approvedAmount: {
    type: Number,
    default: null
  },
  incidentDate: {
    type: Date,
    required: [true, 'Please provide incident date']
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'approved', 'rejected', 'paid'],
    default: 'pending'
  },
  documents: [{
    name: String,
    url: String,
    type: {
      type: String,
      enum: ['hospital_bill', 'medical_report', 'accident_photo', 'hospital_approval_letter', 'police_report', 'discharge_summary', 'other']
    },
    uploadedAt: Date,
    verified: {
      type: Boolean,
      default: false
    }
  }],
  bankDetails: {
    accountHolderName: {
      type: String,
      required: [true, 'Account holder name is required']
    },
    accountNumber: {
      type: String,
      required: [true, 'Account number is required']
    },
    ifscCode: {
      type: String,
      required: [true, 'IFSC code is required']
    },
    bankName: {
      type: String,
      required: [true, 'Bank name is required']
    },
    branchName: {
      type: String
    },
    accountType: {
      type: String,
      enum: ['savings', 'current'],
      default: 'savings'
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  documentVerification: {
    hospitalApprovalLetterVerified: {
      type: Boolean,
      default: false
    },
    directorSignatureVerified: {
      type: Boolean,
      default: false
    },
    doctorSignatureVerified: {
      type: Boolean,
      default: false
    },
    billsVerified: {
      type: Boolean,
      default: false
    },
    medicalReportsVerified: {
      type: Boolean,
      default: false
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    verificationNotes: String,
    verifiedAt: Date
  },
  rejectionReason: {
    type: String,
    default: ''
  },
  adminNotes: {
    type: String,
    default: ''
  },
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  processedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Generate claim number before saving
claimSchema.pre('save', async function(next) {
  if (!this.claimNumber) {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    this.claimNumber = `CLM-${year}-${random}`;
  }
  next();
});

module.exports = mongoose.model('Claim', claimSchema);
