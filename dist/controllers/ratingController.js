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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingController = void 0;
const prismaClient_1 = require("../database/prismaClient");
class ratingController {
    createRating(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_service, questions } = req.body;
            if (!id_service || !questions) {
                return res
                    .status(400)
                    .json({ error: "id_service and questions are required" });
            }
            try {
                const serializedQuestions = JSON.stringify(questions);
                const newRating = yield prismaClient_1.prisma.rating.create({
                    data: {
                        questions: serializedQuestions,
                        service: {
                            connect: { id: id_service },
                        },
                    },
                });
                // Update the service to reference the new rating
                yield prismaClient_1.prisma.services.update({
                    where: { id: id_service },
                    data: { id_rating: newRating.id },
                });
                res
                    .status(201)
                    .json({ message: "Rating created successfully", rating: newRating });
            }
            catch (e) {
                console.error(e.message);
                res.status(500).json({ error: "Error while creating rating" });
            }
        });
    }
}
exports.ratingController = ratingController;
