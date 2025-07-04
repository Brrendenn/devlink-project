import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();
export const updateProfileDetails = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    const { imageUrl, theme } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Not authorized" });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                imageUrl,
                theme,
            },
        });
        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating profile', error });
    }
};