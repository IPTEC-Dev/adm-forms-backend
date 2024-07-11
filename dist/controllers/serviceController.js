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
exports.createServiceController = void 0;
const prismaClient_1 = require("../database/prismaClient");
class createServiceController {
    createService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_attendant, type, register } = req.body;
            if (!id_attendant || !type) {
                return res
                    .status(400)
                    .json({ error: "id_attendant and type are required" });
            }
            try {
                const newService = yield prismaClient_1.prisma.services.create({
                    data: {
                        type,
                        register,
                        created_at: new Date(),
                        id_attendant,
                    },
                });
                res
                    .status(201)
                    .json({ message: "Service created successfully", service: newService });
            }
            catch (e) {
                console.error(e.message);
                res.status(500).json({ error: "Error while creating service" });
            }
        });
    }
    getServices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const services = yield prismaClient_1.prisma.services.findMany({
                    include: {
                        rating: true,
                        attendant: true,
                    },
                });
                const transformedServices = services.map((service) => {
                    if (service.rating) {
                        service.rating.questions = JSON.parse(service.rating.questions);
                    }
                    return service;
                });
                res.json({ services: transformedServices });
            }
            catch (e) {
                console.error(e.message);
                res.status(500).json({ error: "Error while getting services" });
            }
        });
    }
}
exports.createServiceController = createServiceController;
