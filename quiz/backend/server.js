import dotenv from "dotenv";
dotenv.config();

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
    origin: (origin, callback) => {
      // Allow requests without origin
      // such as Postman/server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

/* =========================
   Health Check
========================= */

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Quiz Battleground API is running",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

/* =========================
   Database
========================= */

connectDB();

/* =========================
   API Routes
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

/* =========================
   Socket.IO
========================= */

io.on("connection", (socket) => {
  console.log("🔌 New user connected:", socket.id);

  /* =========================
     Join Room
  ========================= */

  socket.on("join-room", ({ joinID, user }) => {
    if (!joinID || !user?.email || !user?.name) {
      return;
    }

    socket.join(joinID);

    if (!rooms[joinID]) {
      rooms[joinID] = {
        users: [],
        readyUsers: [],
        sockets: {},
      };
    }

    const alreadyJoined = rooms[joinID].users.some(
      (u) => u.email === user.email
    );

    if (!alreadyJoined) {
      rooms[joinID].users.push({
        name: user.name,
        email: user.email,
      });
    }

    // Always associate socket with the user
    rooms[joinID].sockets[socket.id] = {
      name: user.name,
      email: user.email,
    };

    io.to(joinID).emit("room-update", rooms[joinID]);

    console.log(`${user.name} joined room ${joinID}`);
  });

  /* =========================
     Player Ready
  ========================= */

  socket.on("player-ready", ({ joinID, user }) => {
    if (!rooms[joinID] || !user?.email) {
      return;
    }

    const alreadyReady = rooms[joinID].readyUsers.some(
      (u) => u.email === user.email
    );

    if (!alreadyReady) {
      rooms[joinID].readyUsers.push({
        name: user.name,
        email: user.email,
      });
    }

    io.to(joinID).emit("room-update", rooms[joinID]);

    console.log(`${user.name} is ready in room ${joinID}`);
  });

  /* =========================
     Start Quiz
  ========================= */

  socket.on("start-quiz", ({ joinID }) => {
    if (!rooms[joinID]) {
      return;
    }

    const room = rooms[joinID];

    if (room.users.length < 2) {
      socket.emit("not-all-ready", {
        message: "At least 2 players are required.",
      });

      return;
    }

    const allReady = room.users.length === room.readyUsers.length;

    if (allReady) {
      io.to(joinID).emit("all-users-ready");

      console.log(`Quiz started in room ${joinID}`);
    } else {
      socket.emit("not-all-ready", {
        message: "Waiting for all players to be ready.",
      });
    }
  });

  /* =========================
     Disconnect
  ========================= */

  socket.on("disconnect", () => {
    console.log("🔌 User disconnected:", socket.id);

    for (const joinID in rooms) {
      const room = rooms[joinID];

      const user = room.sockets[socket.id];

      if (!user) {
        continue;
      }

      room.users = room.users.filter((u) => u.email !== user.email);

      room.readyUsers = room.readyUsers.filter((u) => u.email !== user.email);

      delete room.sockets[socket.id];

      io.to(joinID).emit("room-update", room);

      console.log(`${user.name} left room ${joinID}`);

      if (room.users.length === 0 && room.readyUsers.length === 0) {
        delete rooms[joinID];

        console.log(`Room ${joinID} deleted.`);
      }
    }
  });
});

/* =========================
   Start Server
========================= */

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
