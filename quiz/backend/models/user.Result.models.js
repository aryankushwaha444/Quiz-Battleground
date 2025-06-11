import mongoose from "mongoose";

const userResultSchema = new mongoose.Schema({
  nameUser: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  nameCategory: {
    type: String,
    required: true,
  },
  questions: [{
    question: {
      type: String,
      required: true
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
  }]
}, {
  timestamps: true
});

// ✅ Compound unique index to prevent duplicate (nameUser + nameCategory)
userResultSchema.index({ email:1, nameCategory:1 }, { unique: true });

const ResultCategories = mongoose.model('ResultCategories', userResultSchema);

export default ResultCategories;
