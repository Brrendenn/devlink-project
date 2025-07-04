import { Router } from 'express';
import { updateProfileDetails, getProfileDetails } from '../controllers/profileController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();


router.get('/me/profile', authMiddleware, getProfileDetails);
router.put('/me/profile', authMiddleware, updateProfileDetails);

export default router;