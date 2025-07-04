import { Router } from 'express';
import { updateProfileDetails } from '../controllers/profileController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.put('/me/profile', authMiddleware, updateProfileDetails);

export default router;