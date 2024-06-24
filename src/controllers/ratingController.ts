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
      // Serializa o objeto questions para uma string JSON
      const serializedQuestions = JSON.stringify(questions);

      const newRating = await prisma.rating.create({
        data: {
          id_service,
          questions: serializedQuestions,
        },
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
