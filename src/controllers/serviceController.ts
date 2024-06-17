import { Request, Response } from "express";
import { prisma } from "../database/prismaClient";

export class createServiceController {
  async createAttendment(req: Request, res: Response) {
    const { id_attendant, type, register } = req.body;
    try {
      const newAttendment = await prisma.services.create({
        data: {
          type,
          register,
          created_at: new Date(),
          id_attendant: 1,
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
