import { Request, Response } from "express";
import { prisma } from "../database/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtToken = process.env.JWT_KEY || "";

export class createUserController {
  async createAttendant(req: Request, res: Response) {
    const { name, last_name, email, password } = req.body;

    try {
      const existingEmail = await prisma.attendant.findUnique({
        where: { email },
      });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.attendant.create({
        data: {
          name,
          last_name,
          email,
          password: hashedPassword,
        },
      });
      res.status(201).json({ message: "User created successfully" });
    } catch (e: any) {
      console.error(e.message);
      res.status(500).json({ error: "Error while creating user" });
    }
  }
}

export class LoginUserController {
  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await prisma.attendant.findUnique({
        where: { email: email },
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
      const token = jwt.sign({ userId: user.id }, jwtToken, {
        expiresIn: "90d",
      });
      res.status(200).json({ Message: "Login successful", token });
    } catch (e: any) {
      console.error("Error while login", e.message);
      return res.status(500).json({ error: "Error while login" });
    }
  }
}
