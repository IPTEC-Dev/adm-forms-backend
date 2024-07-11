"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = require("../src/routes/authRoutes");
const serviceRoutes_1 = require("./routes/serviceRoutes");
const ratingRoutes_1 = require("./routes/ratingRoutes");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.use("/", authRoutes_1.authRouter);
exports.app.use("/", serviceRoutes_1.serviceRouter);
exports.app.use("/", ratingRoutes_1.ratingRouter);
