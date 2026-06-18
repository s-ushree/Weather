import express from 'express';
import { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile,
  updateUserLocation 
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.route('/me')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.put('/location', protect, updateUserLocation);

export default router;
