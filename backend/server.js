import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./db/mongoDB.connection.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import Leaderboard from "./models/Leaderboard.models.js";
import { verifyRoomCode } from "./utils/roomCode.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// REST API routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// In-memory structure to store room-related data (users, readyUsers, sockets)
const rooms = {}; // { joinID: { users: [], readyUsers: [], sockets: {}, winner: null } }

function createNewRoom(joinID) {
  rooms[joinID] = {
    users: [],
    readyUsers: [],
    sockets: {},
    winner: null,
  };
  return rooms[joinID];
}

io.on("connection", (socket) => {
  console.log(`A new client connected (Socket ID: ${socket.id})`);

  // User joins a room (verify signed joinID)
  socket.on("join-room", async ({ joinID, user }) => {
    if (!verifyRoomCode(joinID)) {
      socket.emit("room-error", { message: "Invalid room code" });
      return;
    }
    const room = rooms[joinID] || createNewRoom(joinID);

    // Add user if not already in room
    const existingUser = room.users.find((u) => u.email === user.email);
    if (!existingUser) {
      room.users.push(user);
    }

    room.sockets[socket.id] = user;
    socket.join(joinID);

    console.log(
      `${user.name} joined room ${joinID}. Total users: ${room.users.length}`
    );

    io.to(joinID).emit("room-update", room);

    // Fetch leaderboard or create new one
    let leaderboardDoc = await Leaderboard.findOne({ joinID });
    if (!leaderboardDoc) {
      leaderboardDoc = new Leaderboard({ joinID, scores: [] });
      await leaderboardDoc.save();
    }

    // Convert leaderboard to object keyed by email
    const leaderboardObj = {};
    leaderboardDoc.scores.forEach((s) => {
      leaderboardObj[s.email] = s;
    });

    socket.emit("score-broadcast", leaderboardObj);
  });

  // User marks themselves ready
  socket.on("start-quiz", ({ joinID, user }) => {
    const room = rooms[joinID];
    if (!room) return;

    const alreadyReady = room.readyUsers.some((u) => u.email === user.email);
    if (!alreadyReady) room.readyUsers.push(user);

    console.log(
      `${user.name} is ready in room ${joinID}. Ready count: ${room.readyUsers.length}/${room.users.length}`
    );

    // Require at least 2 players and all marked ready
    const allReady =
      room.users.length >= 2 &&
      room.users.every((u) => room.readyUsers.some((r) => r.email === u.email));

    if (allReady) {
      console.log(`All users are ready in room ${joinID}. Starting quiz...`);
      io.to(joinID).emit("all-users-ready");
    } else {
      const readyCount = room.readyUsers.length;
      const totalUsers = room.users.length;
      const needPlayers = totalUsers < 2;
      socket.emit("not-all-ready", {
        message: needPlayers
          ? "At least 2 players are required to start. Invite another player."
          : "Waiting for other players to ready...",
        readyCount,
        totalUsers,
      });
    }
  });

  // Update score and determine winner (first to reach >= 40 points)
  socket.on("score-update", async ({ joinID, user, score }) => {
    try {
      const room = rooms[joinID] || createNewRoom(joinID);
      if (room.winner) {
        // Game over for this room; ignore further scoring
        return;
      }

      let leaderboardDoc = await Leaderboard.findOne({ joinID });
      if (!leaderboardDoc) {
        leaderboardDoc = new Leaderboard({ joinID, scores: [] });
      }

      const idx = leaderboardDoc.scores.findIndex(
        (s) => s.email === user.email
      );
      if (idx >= 0) {
        leaderboardDoc.scores[idx] = {
          ...leaderboardDoc.scores[idx].toObject(),
          ...score,
          name: user.name,
          updatedAt: new Date(),
        };
      } else {
        leaderboardDoc.scores.push({
          email: user.email,
          name: user.name,
          ...score,
        });
      }

      await leaderboardDoc.save();

      // Convert to object keyed by email before emitting
      const leaderboardObj = {};
      leaderboardDoc.scores.forEach((s) => {
        leaderboardObj[s.email] = s;
      });

      io.to(joinID).emit("score-broadcast", leaderboardObj);

      // Winner check: first player to reach or exceed 40 points wins immediately
      const totalPoints =
        (score.easy || 0) * 1 + (score.medium || 0) * 2 + (score.hard || 0) * 3;
      if (!room.winner && totalPoints >= 40) {
        room.winner = { name: user.name, email: user.email, totalPoints };
        io.to(joinID).emit("winner-declared", { winner: room.winner });
        console.log(
          `Winner declared in room ${joinID}: ${user.name} (${totalPoints} pts)`
        );
      }

      console.log(`${user.name} updated their score in room ${joinID}:`, score);
    } catch (err) {
      console.error("Error saving score:", err);
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    for (const joinID in rooms) {
      const room = rooms[joinID];
      const user = room.sockets[socket.id];

      if (user) {
        room.users = room.users.filter((u) => u.email !== user.email);
        room.readyUsers = room.readyUsers.filter((u) => u.email !== user.email);
        delete room.sockets[socket.id];

        console.log(
          `${user.name} left room ${joinID}. Remaining users: ${room.users.length}`
        );

        io.to(joinID).emit("room-update", room);
      }

      // Delete room if empty
      if (room.users.length === 0) {
        delete rooms[joinID];
        console.log(`Room ${joinID} deleted because it became empty`);
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running with Socket.IO on http://localhost:${PORT}`);
});
