"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = process.env.PORT || 3000;
const server = app_1.app.listen(port, () => console.log(`Running on port ${port}`));
process.on("SIGINT", () => {
    server.close(() => {
        console.log("Server closed");
    });
});
