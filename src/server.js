import http from "http";
import app from "./app.js";
import { Server } from "socket.io";
import env from "./config/env.js";
import connectDB from "./config/db.js";
import { initNotificationSocket } from "./sockets/notification.socket.js";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: env.CLIENT_URL,
    credentials: true,
  },
});

initNotificationSocket(io);

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("join:admin", () => {
    socket.join("admins");

    console.log(`Admin joined room: ${socket.id}`);
  });

  socket.on("disconnect", (reason) => {
    console.log(`Socket disconnected: ${socket.id} - ${reason}`);
  });

  socket.on("error", (error) => {
    console.error(`Socket error [${socket.id}]:`, error);
  });
});

const startServer = async () => {
  try {
    await connectDB();

    server.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();