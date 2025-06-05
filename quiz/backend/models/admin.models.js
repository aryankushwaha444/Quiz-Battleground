
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      required: true,
      unique: true,
      minlength: 5  
    },
    password: {
      type: String,
      required: true,
      minlength: 5 
    }
  },
  {
    timestamps: true
  }
);

const Admins = mongoose.model("Admins", adminSchema);

export default Admins;
