const express = require('express');
const router = express.Router();
const {
  getUserPayments,
  getAllPayments,
  getPayment,
  createPayment,
  completePayment,
  getPaymentStats
} = require('../controllers/paymentController');
const { protect, admin } = require('../middleware/auth');
const { 
  validatePayment, 
  validateMongoId, 
  handleValidation 
} = require('../middleware/validation');

router.get('/', protect, getUserPayments);
router.get('/all', protect, admin, getAllPayments);
router.get('/stats', protect, admin, getPaymentStats);
router.post('/', protect, validatePayment, handleValidation, createPayment);
router.get('/:id', protect, validateMongoId, handleValidation, getPayment);
router.put('/:id/complete', protect, validateMongoId, handleValidation, completePayment);

module.exports = router;
