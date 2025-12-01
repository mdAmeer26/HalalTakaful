const express = require('express');
const router = express.Router();
const {
  getAllPlans,
  getPlan,
  createPlan,
  updatePlan,
  deletePlan
} = require('../controllers/planController');
const { protect, admin } = require('../middleware/auth');
const { 
  validatePlan, 
  validateMongoId, 
  handleValidation 
} = require('../middleware/validation');

router.get('/', getAllPlans);
router.get('/:id', validateMongoId, handleValidation, getPlan);
router.post('/', protect, admin, validatePlan, handleValidation, createPlan);
router.put('/:id', protect, admin, validateMongoId, handleValidation, updatePlan);
router.delete('/:id', protect, admin, validateMongoId, handleValidation, deletePlan);

module.exports = router;
