import mongoose from "mongoose";

const quizBattleground = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      unique: true,
    },
    answer: {
      type: String,
      required: true,
    },
    option1: {
      type: String,
      required: true,
      unique: true,
    },
    option2: {
      type: String,
      required: true,
      unique: true,
    },
    option3: {
      type: String,
      required: true,
      unique: true,
    },
    option4: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Questions = mongoose.model("Questions", quizBattleground);
export default Questions;
