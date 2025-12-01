const Policy = require('../models/Policy');
const Plan = require('../models/Plan');

// @desc    Get all policies for logged in user
// @route   GET /api/policies
// @access  Private
exports.getUserPolicies = async (req, res) => {
  try {
    const policies = await Policy.find({ user: req.user._id })
      .populate('plan', 'name type monthlyContribution coverage')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: policies.length,
      data: policies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get active policies
// @route   GET /api/policies/active
// @access  Private
exports.getActivePolicies = async (req, res) => {
  try {
    const policies = await Policy.find({ 
      user: req.user._id,
      status: 'active'
    })
      .populate('plan', 'name type monthlyContribution coverage')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: policies.length,
      data: policies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single policy
// @route   GET /api/policies/:id
// @access  Private
exports.getPolicy = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id)
      .populate('plan')
      .populate('user', 'name email');

    if (!policy) {
      return res.status(404).json({
        success: false,
        message: 'Policy not found'
      });
    }

    // Check ownership
    if (policy.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this policy'
      });
    }

    res.status(200).json({
      success: true,
      data: policy
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Enroll in a plan (create policy)
// @route   POST /api/policies/enroll
// @access  Private
exports.enrollPlan = async (req, res) => {
  try {
    const { planId, startDate, beneficiaries } = req.body;

    // Check if plan exists
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }

    if (!plan.isActive) {
      return res.status(400).json({
        success: false,
        message: 'This plan is not currently available'
      });
    }

    // Calculate dates
    const start = new Date(startDate);
    const end = new Date(start);
    end.setFullYear(end.getFullYear() + 1); // 1 year policy

    const nextPayment = new Date(start);
    nextPayment.setMonth(nextPayment.getMonth() + 1);

    // Create policy
    const policy = await Policy.create({
      user: req.user._id,
      plan: planId,
      startDate: start,
      endDate: end,
      monthlyContribution: plan.monthlyContribution,
      tabarruAmount: plan.tabarruAmount,
      wakalahFee: plan.wakalahFee,
      wakalahPercentage: plan.wakalahPercentage,
      mudarabahShare: plan.mudarabahShare,
      coverage: plan.coverage,
      nextPaymentDate: nextPayment,
      beneficiaries: beneficiaries || [],
      status: 'pending' // Will be activated after first payment
    });

    await policy.populate('plan', 'name type monthlyContribution tabarruAmount wakalahFee coverage');

    res.status(201).json({
      success: true,
      message: 'Enrolled in Takaful plan! Your Tabarru contribution will join the mutual pool after first payment.',
      data: policy
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update policy
// @route   PUT /api/policies/:id
// @access  Private/Admin
exports.updatePolicy = async (req, res) => {
  try {
    let policy = await Policy.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({
        success: false,
        message: 'Policy not found'
      });
    }

    policy = await Policy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Policy updated successfully',
      data: policy
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancel policy
// @route   DELETE /api/policies/:id
// @access  Private
exports.cancelPolicy = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({
        success: false,
        message: 'Policy not found'
      });
    }

    // Check ownership
    if (policy.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this policy'
      });
    }

    policy.status = 'cancelled';
    await policy.save();

    res.status(200).json({
      success: true,
      message: 'Policy cancelled successfully',
      data: policy
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
