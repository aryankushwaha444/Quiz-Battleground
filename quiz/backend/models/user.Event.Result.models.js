import mongoose from "mongoose";

const userEvent = mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
    },
    correct: {
        type: Boolean,
        default: false,
    }
});

const resultEventSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    nameCategory: {
        type: String,
        required: true,
    },
    roundClear: {
        type: Number,
        default: 0,
    },
    wins: {
        type: String,
        default: 0,
    },
    score: {
        easy: { type: Number, default: 0 },
        medium: { type: Number, default: 0 },
        hard: { type: Number, default: 0 },
    },
    questions: [userEvent], // ✅ FIXED HERE
    finishedAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
});

resultEventSchema.index({ email: 1, nameCategory: 1 }, { unique: true });

resultEventSchema.pre('save', function(next) {
    this.questions.forEach(q => {
        q.correct = q.answer === q.correctAnswer;
    });
    next();
});

const EventResult = mongoose.model("EventResult", resultEventSchema);
export default EventResult;