import mongoose from "mongoose";

const quizbattleground = new mongoose.Schema(
  {
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
  { timestamps:
     true }
);

const User =new mongoose.model("User", quizbattleground);

export default User;
