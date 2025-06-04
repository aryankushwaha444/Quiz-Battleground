import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionStatus = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
    console.log(`MongoDB connected! ${connectionStatus.connection.host} ${process.env.PORT}`);
  } catch (error) {
    console.error(` ERROR: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
