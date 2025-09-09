import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  category: String,
  type: String,
  difficulty: String,
  question: String,
  correct_answer: String,
  incorrect_answers: [String],
},
{
  timestamps: true,
});

const Questions = mongoose.model("Questions", quizSchema);
export default Questions;