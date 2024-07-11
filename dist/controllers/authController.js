"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.LoginUserController = exports.createUserController = void 0;
const prismaClient_1 = require("../database/prismaClient");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtToken = process.env.JWT_KEY || "";
class createUserController {
    createAttendant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, last_name, email, password, adm = false } = req.body;
            try {
                const existingEmail = yield prismaClient_1.prisma.attendant.findUnique({
                    where: { email },
                });
                if (existingEmail) {
                    return res.status(400).json({ message: "Email already exists" });
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newUser = yield prismaClient_1.prisma.attendant.create({
                    data: {
                        name,
                        last_name,
                        email,
                        password: hashedPassword,
                        adm,
                    },
                });
                res.status(201).json({ message: "User created successfully" });
                return newUser;
            }
            catch (e) {
                console.error(e.message);
                res.status(500).json({ error: "Error while creating user" });
            }
        });
    }
}
exports.createUserController = createUserController;
class LoginUserController {
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield prismaClient_1.prisma.attendant.findUnique({
                    where: { email: email },
                });
                if (!user) {
                    return res.status(404).json({ error: "User not found" });
                }
                const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!passwordMatch) {
                    return res.status(401).json({ error: "Invalid password" });
                }
                const token = jsonwebtoken_1.default.sign({ userId: user.id }, jwtToken, {
                    expiresIn: "90d",
                });
                res
                    .status(200)
                    .json({
                    Message: "Login successful",
                    token,
                    userId: user.id,
                    userType: user.adm,
                });
            }
            catch (e) {
                console.error("Error while login", e.message);
                return res.status(500).json({ error: "Error while login" });
            }
        });
    }
}
exports.LoginUserController = LoginUserController;
class UserController {
    getUserWithServices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const user = yield prismaClient_1.prisma.attendant.findUnique({
                    where: { id: parseInt(userId) },
                    select: {
                        id: true,
                        name: true,
                        last_name: true,
                        email: true,
                        services: true,
                    },
                });
                if (!user) {
                    return res.status(404).json({ error: "User not found" });
                }
                res.status(200).json({ user });
            }
            catch (e) {
                console.error("Error while fetching user and services", e.message);
                return res
                    .status(500)
                    .json({ error: "Error while fetching user and services" });
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield prismaClient_1.prisma.attendant.findMany({
                    select: {
                        id: true,
                        name: true,
                        last_name: true,
                        email: true,
                    },
                });
                res.status(200).json({ users });
            }
            catch (e) {
                console.error("Error while fetching users", e.message);
                return res.status(500).json({ error: "Error while fetching users" });
            }
        });
    }
}
exports.UserController = UserController;
