const express = require('express');
const router = express.Router();
const {
  getUserClaims,
  getAllClaims,
  getClaim,
  submitClaim,
  updateClaimStatus,
  deleteClaim
} = require('../controllers/claimController');
const { protect, admin } = require('../middleware/auth');
const { 
  validateClaim, 
  validateMongoId, 
  handleValidation 
} = require('../middleware/validation');

router.get('/', protect, getUserClaims);
router.get('/all', protect, admin, getAllClaims);
router.post('/', protect, validateClaim, handleValidation, submitClaim);
router.get('/:id', protect, validateMongoId, handleValidation, getClaim);
router.put('/:id/status', protect, admin, validateMongoId, handleValidation, updateClaimStatus);
router.delete('/:id', protect, admin, validateMongoId, handleValidation, deleteClaim);

module.exports = router;
