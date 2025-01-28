import { Request, Response } from "express";
import prisma from "../db/client";

export const findAll = async (_req: Request, res: Response) => {
  try {
    const payouts = await prisma.payout.findMany();
    
    res.status(200).json(payouts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching payouts" });
  }
};
