import mongoose from "mongoose";

// Define the schema for each question
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true
  },
  answer: {
    type: String
  },
  correct: {
    type: Number,
    default: 0
  },
  score: {
    type: Number,
    default: 0
  }
});

// Define the overall user result schema
const userResultSchema = new mongoose.Schema(
  {
    nameCategory: {
      type: String,
      required: true
    },
    nameUser: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    questions: [questionSchema] // Note the plural 'questions' and embedded schema
  },
  {
    timestamps: true
  }
);

// Model name updated to 'UserResult' for clarity
const Categories = mongoose.model("Categories", userResultSchema);

export default Categories;
