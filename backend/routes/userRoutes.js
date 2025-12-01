const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');
const { validateMongoId, handleValidation } = require('../middleware/validation');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/', protect, admin, getAllUsers);
router.get('/:id', protect, admin, validateMongoId, handleValidation, getUser);
router.put('/:id', protect, admin, validateMongoId, handleValidation, updateUser);
router.delete('/:id', protect, admin, validateMongoId, handleValidation, deleteUser);

module.exports = router;
