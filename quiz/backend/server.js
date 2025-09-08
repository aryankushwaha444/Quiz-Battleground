import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./db/mongoDB.connection.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
// import test from './routes/test.routes.js';
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// Routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// Create HTTP server instance
const server = http.createServer(app);

// Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Store rooms with users and readiness state
const rooms = {}; // Format: { joinID: { users: [], readyUsers: [], sockets: {} } }
const leaderboard = {};

io.on("connection", (socket) => {
  console.log(" New user connected:", socket.id);

  socket.on("join-room", ({ joinID, user }) => {
    if (!rooms[joinID]) {
      rooms[joinID] = { users: [], readyUsers: [], sockets: {} };
    }

    const alreadyJoined = rooms[joinID].users.some(
      (u) => u.email === user.email
    );
    if (!alreadyJoined) {
      rooms[joinID].users.push(user);
      rooms[joinID].sockets[socket.id] = user;

      socket.join(joinID); // join only if first time
      io.to(joinID).emit("room-update", rooms[joinID]);
      console.log(` ${user.name} joined room ${joinID}`);
    }
  });

  socket.on("start-quiz", ({ joinID, user }) => {
    if (!rooms[joinID]) return;

    // Mark user as ready if not already
    const alreadyReady = rooms[joinID].readyUsers.some(
      (u) => u.email === user.email
    );
    if (!alreadyReady) {
      rooms[joinID].readyUsers.push(user);
    }

    console.log("Room state:", rooms[joinID]);
    console.log(
      `Users: ${rooms[joinID].users.length}, Ready: ${rooms[joinID].readyUsers.length}`
    );
    console.log(`\n--- Start-quiz received from: ${user.email} ---`);
    console.log(
      "Users in room:",
      rooms[joinID].users.map((u) => u.email)
    );
    console.log(
      "Ready users in room:",
      rooms[joinID].readyUsers.map((u) => u.email)
    );
    console.log(
      `Total Users: ${rooms[joinID].users.length}, Ready: ${rooms[joinID].readyUsers.length}`
    );
    // Check if all users are ready
    const allReady =
      rooms[joinID].users.length > 0 &&
      rooms[joinID].users.every((u) =>
        rooms[joinID].readyUsers.some((r) => r.email === u.email)
      );

    console.log("AllReady =", allReady);

    if (allReady) {
      io.to(joinID).emit("all-users-ready");
      console.log(`✅ Quiz started in room ${joinID}`);
    } else {
      socket.emit("not-all-ready", {
        message: "Waiting for other players to ready...",
      });
    }
  });

  socket.on("disconnect", () => {
    console.log(" User disconnected:", socket.id);

    // Find and remove from all rooms
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

        // Broadcast updated users
        io.to(joinID).emit("room-update", rooms[joinID]);
        console.log(` ${user.name} left room ${joinID}`);
      }

      // Optional: remove empty room
      if (
        rooms[joinID].users.length === 0 &&
        rooms[joinID].readyUsers.length === 0
      ) {
        delete rooms[joinID];
        console.log(` Room ${joinID} deleted (empty).`);
      }
    }
  });

  //FOr leaderboard
  socket.on("score-update", ({ joinID, user, score }) => {
    if (!leaderboard[joinID]) leaderboard[joinID] = {};
    leaderboard[joinID][user.email] = score;

    // Broadcast updated scores to all users in the room
    io.to(joinID).emit("score-broadcast", leaderboard[joinID]);
    console.log("score-update received", joinID, user, score);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running with Socket.IO on http://localhost:${PORT}`);
});
