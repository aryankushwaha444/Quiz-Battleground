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
    score: {
      type: Number,
      required: true,
    },
    categoryQuiz:{
      type: String,
      required: true,
      attempt:Number
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
        userAns: {
          type:String,
          require:true
        }
      }
    ],
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model("Result", resultSchema);

export default Result;
