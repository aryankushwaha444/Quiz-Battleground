import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String
  },

  correct: {
    type: Boolean,
    default: false
  }
});

const resultCategorySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  nameCategory: {
    type: String,
    required: true
  },
  round: {
    type: Number,
    default: 0
  },
  score: {
    easy: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    hard: { type: Number, default: 0 }
  },
  questions: [questionSchema],
  finishedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Prevent duplicate result submissions
resultCategorySchema.index({ email: 1, nameCategory: 1 }, { unique: true });



const ResultCategory = mongoose.model("ResultCategory", resultCategorySchema);
export default ResultCategory;
