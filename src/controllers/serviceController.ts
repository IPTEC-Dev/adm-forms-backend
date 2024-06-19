import { Request, Response } from "express";
import { prisma } from "../database/prismaClient";

export class createServiceController {
  async createService(req: Request, res: Response) {
    const { id_attendant, type, register } = req.body;

    if (!id_attendant || !type) {
      return res
        .status(400)
        .json({ error: "id_attendant and type are required" });
    }

    try {
      const newService = await prisma.services.create({
        data: {
          type,
          register,
          created_at: new Date(),
          id_attendant,
        },
      });
      res
        .status(201)
        .json({ message: "Service created successfully", service: newService });
    } catch (e: any) {
      console.error(e.message);
      res.status(500).json({ error: "Error while creating service" });
    }
  }
}
