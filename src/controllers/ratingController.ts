import { Request, Response } from "express";
import { prisma } from "../database/prismaClient";

export class ratingController {
  async createRating(req: Request, res: Response) {
    const { id_service, questions } = req.body;
    if (!id_service || !questions) {
      return res
        .status(400)
        .json({ error: "id_service and questions are required" });
    }
    try {
      const serializedQuestions = JSON.stringify(questions);

      const newRating = await prisma.rating.create({
        data: {
          questions: serializedQuestions,
          service: {
            connect: { id: id_service },
          },
        },
      });

      // Update the service to reference the new rating
      await prisma.services.update({
        where: { id: id_service },
        data: { id_rating: newRating.id },
      });

      res
        .status(201)
        .json({ message: "Rating created successfully", rating: newRating });
    } catch (e: any) {
      console.error(e.message);
      res.status(500).json({ error: "Error while creating rating" });
    }
  }
}
