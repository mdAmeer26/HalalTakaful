const Claim = require('../models/Claim');
const Policy = require('../models/Policy');

// @desc    Get all claims for logged in user
// @route   GET /api/claims
// @access  Private
exports.getUserClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ user: req.user._id })
      .populate('policy', 'policyNumber plan')
      .populate({
        path: 'policy',
        populate: { path: 'plan', select: 'name type' }
      })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: claims.length,
      data: claims
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all claims (admin)
// @route   GET /api/claims/all
// @access  Private/Admin
exports.getAllClaims = async (req, res) => {
  try {
    const { status, type } = req.query;
    
    let query = {};
    if (status) query.status = status;
    if (type) query.type = type;

    const claims = await Claim.find(query)
      .populate('user', 'name email')
      .populate('policy', 'policyNumber')
      .populate({
        path: 'policy',
        populate: { path: 'plan', select: 'name type' }
      })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: claims.length,
      data: claims
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single claim
// @route   GET /api/claims/:id
// @access  Private
exports.getClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id)
      .populate('user', 'name email')
      .populate('policy')
      .populate({
        path: 'policy',
        populate: { path: 'plan' }
      });

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: 'Claim not found'
      });
    }

    // Check ownership
    if (claim.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this claim'
      });
    }

    res.status(200).json({
      success: true,
      data: claim
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Submit a claim
// @route   POST /api/claims
// @access  Private
exports.submitClaim = async (req, res) => {
  try {
    const { policyId, type, description, amount, incidentDate } = req.body;

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
        message: 'Not authorized to file claim for this policy'
      });
    }

    if (policy.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Cannot file claim for inactive policy'
      });
    }

    // Check if claim amount exceeds coverage
    if (amount > policy.coverage) {
      return res.status(400).json({
        success: false,
        message: `Claim amount exceeds policy coverage of $${policy.coverage}`
      });
    }

    // Create claim
    const claim = await Claim.create({
      user: req.user._id,
      policy: policyId,
      type,
      description,
      amount,
      incidentDate,
      documents: req.files ? req.files.map(file => ({
        name: file.originalname,
        url: file.path,
        uploadedAt: new Date()
      })) : []
    });

    await claim.populate('policy', 'policyNumber plan');

    res.status(201).json({
      success: true,
      message: 'Claim submitted to Tabarru mutual pool. We will review within 24-48 hours.',
      data: claim
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update claim status (admin)
// @route   PUT /api/claims/:id/status
// @access  Private/Admin
exports.updateClaimStatus = async (req, res) => {
  try {
    const { status, approvedAmount, adminNotes } = req.body;

    let claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: 'Claim not found'
      });
    }

    claim.status = status;
    if (approvedAmount !== undefined) claim.approvedAmount = approvedAmount;
    if (adminNotes) claim.adminNotes = adminNotes;
    claim.processedBy = req.user._id;
    claim.processedAt = new Date();

    await claim.save();

    res.status(200).json({
      success: true,
      message: `Claim ${status} successfully`,
      data: claim
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete claim
// @route   DELETE /api/claims/:id
// @access  Private/Admin
exports.deleteClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: 'Claim not found'
      });
    }

    await claim.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Claim deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
