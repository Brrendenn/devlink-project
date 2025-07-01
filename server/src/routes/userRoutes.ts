import { Router } from "express";
import { getPublicProfile, updateMyLinks } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/profile/:username", getPublicProfile);

router.put("/me/links", authMiddleware, updateMyLinks);

export default router;
