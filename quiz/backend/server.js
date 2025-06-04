
import dotenv from "dotenv";
dotenv.config();


import express from "express";
import connectDB from "./db/connetion.js";
import userRoutes from "./routes/user.routes.js";


const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("🚀 Server is working fine on port 5000!");
  });
  
app.use("/api", userRoutes);

app.get('/list' , (req,res)=>{
  res.send(data);
})




const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
      console.log(`✅ Successfully connected to MongoDB`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
  );