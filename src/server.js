import http from "http";
import app from "./app.js";
import { Server } from "socket.io";
import env from "./config/env.js";
import connectDB from "./config/db.js";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Admin connected:", socket.id);
});

const startServer = async () => {
  try {
    await connectDB();
    server.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();