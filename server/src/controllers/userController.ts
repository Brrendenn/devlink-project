import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/authMiddleware";

const prisma = new PrismaClient();

export const getPublicProfile = async(req: AuthRequest, res: Response) => {
    try{
        const {username} = req.params;
        const user = await prisma.user.findUnique({
            where: {username},
            include: {links: true},
        });

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json({
            username: user.username,
            links: user.links,
        });
    } catch (error){
        res.status(500).json({message: "Server error", error});
    }
};

export const updateMyLinks = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    const {links} = req.body;

    if(!userId){
        return res.status(401).json({message: "Not Authorized"});
    }
    if(!Array.isArray(links)){
        return res.status(400).json({message: "Links must be an array"});
    }

    try{
        await prisma.$transaction([
            prisma.link.deleteMany({where: {userId}}),

            prisma.link.createMany({
                data: links.map(link => ({
                    title: link.title,
                    url: link.url,
                    userId: userId,
                })),
            }),
        ]);

        res.status(200).json({message: "Links updated successfully"});
    } catch (error){
        res.status(500).json({message: "Server error while updating links", error});
    };
}