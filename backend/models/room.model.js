import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, index: true },
    createdBy: {
      name: { type: String },
      email: { type: String },
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
