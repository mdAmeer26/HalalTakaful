const express = require('express');
const router = express.Router();
const {
  getUserPolicies,
  getActivePolicies,
  getPolicy,
  enrollPlan,
  updatePolicy,
  cancelPolicy
} = require('../controllers/policyController');
const { protect, admin } = require('../middleware/auth');
const { 
  validatePolicy, 
  validateMongoId, 
  handleValidation 
} = require('../middleware/validation');

router.get('/', protect, getUserPolicies);
router.get('/active', protect, getActivePolicies);
router.post('/enroll', protect, validatePolicy, handleValidation, enrollPlan);
router.get('/:id', protect, validateMongoId, handleValidation, getPolicy);
router.put('/:id', protect, admin, validateMongoId, handleValidation, updatePolicy);
router.delete('/:id', protect, validateMongoId, handleValidation, cancelPolicy);

module.exports = router;
