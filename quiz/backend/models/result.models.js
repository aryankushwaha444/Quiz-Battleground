import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    joinID: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    questions: [
      {
        quizQues: {
          type: String,
          required: true,
          unique: true,
        },
        correctAns: {
          type: Number,
          default:0
        },
        inCorrectAns: {
          type: Number,
          default:0
        },
        nullAns: {
          type: Number,
          default: 0,
        },
      }
    ],
    totalAttempt: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model("Result", resultSchema);

export default Result;
