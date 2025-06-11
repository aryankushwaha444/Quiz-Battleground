import mongoose from "mongoose";

const userEvent = mongoose.Schema(
  {
    nameUser: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    eventName: {
      type: String,
      require: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
    },
    correct: {
      type: Boolean,
    },
    score: {
      type: Number,
      required: true,
    },
    wins: {
      type: Boolean,
    },
    prize: {
      type: Number,
    },
    prizeName: String,
    prizeImage: String,
  },
  {
    timestamps: true,
  }
);

const UserEvent = mongoose.model("UserEvent", userEvent);

export default UserEvent;
