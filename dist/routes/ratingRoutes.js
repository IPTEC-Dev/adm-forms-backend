"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingRouter = void 0;
const express_1 = require("express");
const ratingController_1 = require("./../controllers/ratingController");
const ratingRouter = (0, express_1.Router)();
exports.ratingRouter = ratingRouter;
const createRating = new ratingController_1.ratingController();
ratingRouter.post("/create-rating", createRating.createRating);
