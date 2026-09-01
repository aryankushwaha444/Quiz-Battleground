import dotenv from "dotenv";
dotenv.config();
// require("dotenv").config();

import express from "express";
import connectDB from "./db/mongoDB.connection.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 5001;

const app = express();

/* =========================
   Middleware
========================= */

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://quiz-battleground.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

/* =========================
   Database Connection
========================= */

connectDB();

/* =========================
   Routes
========================= */

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

/* =========================
   HTTP Server
========================= */

const server = http.createServer(app);

/* =========================
   Socket.IO
========================= */

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

/* =========================
   Room Storage
========================= */

const rooms = {};

/*
  Format:

  {
    joinID: {
      users: [],
      readyUsers: [],
      sockets: {}
    }
  }
*/

/* =========================
   Socket.IO Events
========================= */

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  /* Join Room */
  socket.on("join-room", ({ joinID, user }) => {
    socket.join(joinID);

    if (!rooms[joinID]) {
      rooms[joinID] = {
        users: [],
        readyUsers: [],
        sockets: {},
      };
    }

    /* Prevent duplicate users */
    const alreadyJoined = rooms[joinID].users.some(
      (u) => u.email === user.email
    );

    if (!alreadyJoined) {
      rooms[joinID].users.push(user);
      rooms[joinID].sockets[socket.id] = user;
    }

    io.to(joinID).emit("room-update", rooms[joinID]);

    console.log(`${user.name} joined room ${joinID}`);
  });

  /* Player Ready */
  socket.on("player-ready", ({ joinID, user }) => {
    if (!rooms[joinID]) return;

    const alreadyReady = rooms[joinID].readyUsers.some(
      (u) => u.email === user.email
    );

    if (!alreadyReady) {
      rooms[joinID].readyUsers.push(user);
    }

    io.to(joinID).emit("room-update", rooms[joinID]);

    console.log(`${user.name} is ready in room ${joinID}`);
  });

  /* Start Quiz */
  socket.on("start-quiz", ({ joinID }) => {
    if (!rooms[joinID]) return;

    if (rooms[joinID].users.length >= 2) {
      const allReady =
        rooms[joinID].users.length === rooms[joinID].readyUsers.length;

      if (allReady) {
        io.to(joinID).emit("all-users-ready");

        console.log(`Quiz started in room ${joinID}`);
      } else {
        socket.emit("not-all-ready", {
          message: "Waiting for other players / (Only you are!) to Ready...",
        });
      }
    }
  });

  /* Disconnect */
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    for (const joinID in rooms) {
      const user = rooms[joinID].sockets[socket.id];

      if (user) {
        rooms[joinID].users = rooms[joinID].users.filter(
          (u) => u.email !== user.email
        );

        rooms[joinID].readyUsers = rooms[joinID].readyUsers.filter(
          (u) => u.email !== user.email
        );

        delete rooms[joinID].sockets[socket.id];

        io.to(joinID).emit("room-update", rooms[joinID]);

        console.log(`${user.name} left room ${joinID}`);
      }

      /* Delete empty room */
      if (
        rooms[joinID].users.length === 0 &&
        rooms[joinID].readyUsers.length === 0
      ) {
        delete rooms[joinID];

        console.log(`Room ${joinID} deleted (empty).`);
      }
    }
  });
});

/* =========================
   Start Server
========================= */

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running with Socket.IO on port ${PORT}`);
});
