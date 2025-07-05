import { Router } from "express";
import { getPublicProfile, updateMyLinks, getMyLinks } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/profile/:username", getPublicProfile);

router.put("/me/links", authMiddleware, updateMyLinks);

router.get('/me/links', authMiddleware, getMyLinks);

export default router;
