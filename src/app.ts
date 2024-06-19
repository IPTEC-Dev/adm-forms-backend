import express from "express";
import cors from "cors";
import { authRouter } from "../src/routes/authRoutes";
import { serviceRouter } from "./routes/serviceRoutes";
import { ratingRouter } from "./routes/ratingRoutes";

export const app = express();

app.use(express.json());
app.use(cors());
app.use("/", authRouter);
app.use("/", serviceRouter);
app.use("/", ratingRouter);
