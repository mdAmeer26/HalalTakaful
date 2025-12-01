const { body, param, validationResult } = require('express-validator');

// Handle validation errors
exports.handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User registration validation
exports.validateRegister = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// Login validation
exports.validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
];

// Plan validation
exports.validatePlan = [
  body('name')
    .trim()
    .notEmpty().withMessage('Plan name is required'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required'),
  body('type')
    .notEmpty().withMessage('Plan type is required')
    .isIn(['health', 'life', 'auto', 'property']).withMessage('Invalid plan type'),
  body('monthlyContribution')
    .notEmpty().withMessage('Monthly contribution is required')
    .isNumeric().withMessage('Must be a number')
    .isFloat({ min: 0 }).withMessage('Must be positive'),
  body('coverage')
    .notEmpty().withMessage('Coverage amount is required')
    .isNumeric().withMessage('Must be a number')
    .isFloat({ min: 0 }).withMessage('Must be positive'),
];

// Policy validation
exports.validatePolicy = [
  body('planId')
    .notEmpty().withMessage('Plan ID is required')
    .isMongoId().withMessage('Invalid plan ID'),
  body('startDate')
    .notEmpty().withMessage('Start date is required')
    .isISO8601().withMessage('Invalid date format'),
];

// Claim validation
exports.validateClaim = [
  body('policyId')
    .notEmpty().withMessage('Policy ID is required')
    .isMongoId().withMessage('Invalid policy ID'),
  body('type')
    .notEmpty().withMessage('Claim type is required')
    .isIn(['health', 'life', 'auto', 'property']).withMessage('Invalid claim type'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required'),
  body('amount')
    .notEmpty().withMessage('Claim amount is required')
    .isNumeric().withMessage('Must be a number')
    .isFloat({ min: 0 }).withMessage('Must be positive'),
  body('incidentDate')
    .notEmpty().withMessage('Incident date is required')
    .isISO8601().withMessage('Invalid date format'),
];

// Payment validation
exports.validatePayment = [
  body('policyId')
    .notEmpty().withMessage('Policy ID is required')
    .isMongoId().withMessage('Invalid policy ID'),
  body('amount')
    .notEmpty().withMessage('Amount is required')
    .isNumeric().withMessage('Must be a number')
    .isFloat({ min: 0 }).withMessage('Must be positive'),
  body('paymentMethod')
    .notEmpty().withMessage('Payment method is required')
    .isIn(['credit_card', 'debit_card', 'bank_transfer', 'wallet']).withMessage('Invalid payment method'),
];

// ID parameter validation
exports.validateMongoId = [
  param('id').isMongoId().withMessage('Invalid ID format')
];
