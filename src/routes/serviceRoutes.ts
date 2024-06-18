import { Router } from "express";
import { createServiceController } from "../controllers/serviceController";

const serviceRouter = Router();
const createService = new createServiceController();

serviceRouter.post("/create-service", createService.createService);

export { serviceRouter };
