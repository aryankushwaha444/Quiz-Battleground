import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // Get current file's full path
const __dirname = path.dirname(__filename);        // Derive directory from it

dotenv.config({ path: path.resolve(__dirname, '../.env') });


const connectDB = async () => {
  try {
    const URL = process.env.MONGO_URI;

    await mongoose.connect(URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
