import mongoose from "mongoose";

const quizBattleground = new mongoose.Schema(
  {
    joinID:{
        type: String,
        required: true
    },
    name: {
      type: String,
      required:true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", quizBattleground);

export default User;
