import mongoose from "mongoose";

const eventquizSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      unique: true,
    },
    difficulty: {
      type: String,
      require: true,
    },
    answer: {
      type: String,
      required: true,
    },
    option: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true, // Did you mean `timestamps` instead of `timeseries`?
  }
);

const EventQuiz = mongoose.model("EventQuiz", eventquizSchema);

export default EventQuiz;
