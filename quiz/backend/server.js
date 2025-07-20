import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './db/mongoDB.connection.js';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import test from './routes/test.routes.js';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// Routes
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/test', test); // optional, if test.routes.js exists

// Create HTTP server instance
const server = http.createServer(app);

// Socket.IO Setup
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Store rooms with users and readiness state
const rooms = {}; // Format: { joinID: { users: [], readyUsers: [], sockets: {} } }

io.on('connection', (socket) => {

    socket.on('join-room', ({ joinID, user }) => {
        socket.join(joinID);

        if (!rooms[joinID]) {
            rooms[joinID] = { users: [], readyUsers: [], sockets: {} };
        }

        // Prevent duplicates
        const alreadyJoined = rooms[joinID].users.some(u => u.email === user.email);
        if (!alreadyJoined) {
            rooms[joinID].users.push(user);
            rooms[joinID].sockets[socket.id] = user; // map socket to user
        }

        io.to(joinID).emit('room-update', rooms[joinID]);
    });

    socket.on('start-quiz', ({ joinID, user }) => {
        if (rooms[joinID]) {
            const alreadyReady = rooms[joinID].readyUsers.some(u => u.email === user.email);
            if (!alreadyReady) {
                rooms[joinID].readyUsers.push(user);
            }

            const allReady =
                rooms[joinID].users.length >= 2 &&
                rooms[joinID].users.length === rooms[joinID].readyUsers.length;

            if (allReady) {
                io.to(joinID).emit('all-users-ready');
                console.log(`All users ready in room ${joinID}. Starting quiz.`);
            }
        }
    });

    socket.on('disconnect', () => {
        console.log(' User disconnected:', socket.id);

        // Find and remove from all rooms
        for (const joinID in rooms) {
            const user = rooms[joinID].sockets[socket.id];
            if (user) {
                rooms[joinID].users = rooms[joinID].users.filter(u => u.email !== user.email);
                rooms[joinID].readyUsers = rooms[joinID].readyUsers.filter(u => u.email !== user.email);
                delete rooms[joinID].sockets[socket.id];

                // Broadcast updated users
                io.to(joinID).emit('room-update', rooms[joinID]);
                console.log(`👋 ${user.name} left room ${joinID}`);
            }

        }
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running with Socket.IO on http://localhost:${PORT}`);
});