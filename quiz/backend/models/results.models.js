import mongoose from "mongoose";

const quizBattleground = new mongoose.Schema(
  {
    joinID: {
      type: String,
      required: true,
    },
    name: { type: String, required: true },
    questions: {
      type: String,
      required: true,
      unique: true,
    },
    correctQuestions: {
      type: Number,
      required: true,
    },
    totalAttempt: {
      type: Number,
      required: true,
    },
    inCorrectQuestions: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model("Result", quizBattleground);

export default Result;
