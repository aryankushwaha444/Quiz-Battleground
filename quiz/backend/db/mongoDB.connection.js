
import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    const URL = process.env.MONGO_URI;

    await mongoose.connect(URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
