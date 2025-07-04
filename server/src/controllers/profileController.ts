import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

export const getProfileDetails = async (req: AuthRequest, res: Response) => {
    const userid = req.user?.userId;
    
    if(!userid){
        return res.status(401).json({ message: "Not authorized" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {id: userid},
            select: {
                imageUrl: true,
                theme: true,
            }
        });

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching profile", error});
    }
};

export const updateProfileDetails = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    const { imageUrl, theme } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Not authorized" });
    }

    try {
        const dataToUpdate: { imageUrl?: string; theme?: string } = {};
        if (imageUrl !== undefined) dataToUpdate.imageUrl = imageUrl;
        if (theme !== undefined) dataToUpdate.theme = theme;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: dataToUpdate,
        });
        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating profile', error });
    }
};