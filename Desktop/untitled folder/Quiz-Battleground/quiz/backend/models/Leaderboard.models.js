// quiz/backend/models/leaderboard.models.js
import mongoose from "mongoose";

const LeaderboardSchema = new mongoose.Schema({
  joinID: { type: String, required: true },
  scores: [
    {
      email: String,
      name: String,
      easy: Number,
      medium: Number,
      hard: Number,
      updatedAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("Leaderboard", LeaderboardSchema);
