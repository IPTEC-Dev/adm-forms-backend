import express from "express";
import cors from "cors";
import { authRouter } from "../src/routes/authRoutes";

export const app = express();

app.use(express.json());
app.use(cors());
app.use("/", authRouter);
