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
      type: Boolean,
      default: false
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

// Update correct field based on user's answer
userResultSchema.pre('save', function(next) {
  this.questions.forEach(question => {
    if (question.answer === question.correctAnswer) {
      question.correct = true;
    } else {
      question.correct = false;
    }
  });
  next();
});

const ResultCategories = mongoose.model('ResultCategories', userResultSchema);

export default ResultCategories;
