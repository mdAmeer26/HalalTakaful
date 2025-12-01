const Payment = require('../models/Payment');
const Policy = require('../models/Policy');

// @desc    Get all payments for logged in user
// @route   GET /api/payments
// @access  Private
exports.getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate('policy', 'policyNumber plan')
      .populate({
        path: 'policy',
        populate: { path: 'plan', select: 'name type' }
      })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all payments (admin)
// @route   GET /api/payments/all
// @access  Private/Admin
exports.getAllPayments = async (req, res) => {
  try {
    const { status } = req.query;
    
    let query = {};
    if (status) query.status = status;

    const payments = await Payment.find(query)
      .populate('user', 'name email')
      .populate('policy', 'policyNumber')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single payment
// @route   GET /api/payments/:id
// @access  Private
exports.getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('user', 'name email')
      .populate('policy');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    // Check ownership
    if (payment.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this payment'
      });
    }

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create payment
// @route   POST /api/payments
// @access  Private
exports.createPayment = async (req, res) => {
  try {
    const { policyId, amount, paymentMethod } = req.body;

    // Check if policy exists and belongs to user
    const policy = await Policy.findById(policyId);
    if (!policy) {
      return res.status(404).json({
        success: false,
        message: 'Policy not found'
      });
    }

    if (policy.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to make payment for this policy'
      });
    }

    // Verify payment amount matches monthly contribution
    if (amount !== policy.monthlyContribution) {
      return res.status(400).json({
        success: false,
        message: `Contribution amount must be ₹${policy.monthlyContribution} (₹${policy.tabarruAmount} to pool + ₹${policy.wakalahFee} service fee)`
      });
    }

    // Calculate period covered
    const periodStart = new Date(policy.nextPaymentDate);
    const periodEnd = new Date(periodStart);
    periodEnd.setMonth(periodEnd.getMonth() + 1);

    // Create payment with Takaful breakdown
    const payment = await Payment.create({
      user: req.user._id,
      policy: policyId,
      amount,
      tabarruAmount: policy.tabarruAmount,
      wakalahFee: policy.wakalahFee,
      paymentMethod,
      status: 'pending',
      periodCovered: {
        startDate: periodStart,
        endDate: periodEnd
      }
    });

    res.status(201).json({
      success: true,
      message: `Tabarru contribution initiated. ₹${policy.tabarruAmount} will go to mutual pool, ₹${policy.wakalahFee} for platform service.`,
      data: payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Mark payment as completed
// @route   PUT /api/payments/:id/complete
// @access  Private
exports.completePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    // Check ownership or admin
    if (payment.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this payment'
      });
    }

    if (payment.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Payment already completed'
      });
    }

    // Update payment status
    payment.status = 'completed';
    payment.paymentDate = new Date();
    await payment.save();

    // Update policy
    const policy = await Policy.findById(payment.policy);
    if (policy) {
      // Activate policy if it was pending and this is first payment
      if (policy.status === 'pending') {
        policy.status = 'active';
      }

      // Update next payment date
      const nextPayment = new Date(policy.nextPaymentDate);
      nextPayment.setMonth(nextPayment.getMonth() + 1);
      policy.nextPaymentDate = nextPayment;

      await policy.save();
    }

    res.status(200).json({
      success: true,
      message: 'Payment completed successfully',
      data: payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get payment statistics (admin)
// @route   GET /api/payments/stats
// @access  Private/Admin
exports.getPaymentStats = async (req, res) => {
  try {
    const stats = await Payment.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    const totalRevenue = await Payment.aggregate([
      {
        $match: { status: 'completed' }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        statusBreakdown: stats,
        totalRevenue: totalRevenue[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
