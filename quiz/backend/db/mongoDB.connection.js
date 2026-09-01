import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const URL = process.env.MONGO_URI;

    if (!URL) {
      throw new Error('MONGO_URI is not defined');
    }

    await mongoose.connect(URL);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;