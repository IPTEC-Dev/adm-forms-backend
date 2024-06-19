import { Router } from "express";
import { ratingController } from "./../controllers/ratingController";

const ratingRouter = Router();
const createRating = new ratingController();

ratingRouter.post("/create-rating", createRating.createRating);

export { ratingRouter };
