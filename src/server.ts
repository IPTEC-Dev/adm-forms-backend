import { app } from "./app";

const port = process.env.PORT || 3001;
const server = app.listen(port, () => console.log(`Running on port ${port}`));

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed");
  });
});
