import { Request, Response } from "express";
import { prisma } from "../database/prismaClient";

export class createServiceController {
  async createAttendment(req: Request, res: Response) {
    const { userId, type, register } = req.body;
    try {
      const creationDate = new Date(Date.now());
      const newAttendment = await prisma.services.create({
        data: {
          type,
          register,
          created_at: creationDate,
        },
      });
      res.status(201).json({ message: "Attendment created successfully" });
      return newAttendment;
    } catch (e: any) {
      console.error(e.message);
      res.status(500).json({ error: "Error while creating attendment" });
    }
  }
}
