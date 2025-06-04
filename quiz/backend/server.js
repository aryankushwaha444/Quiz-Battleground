import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./db/connetion.js";

const app = express();

//
const PORT = process.env.PORT || 6000;
app.listen(PORT, () =>
{
    console.log(`Server is running on port ${PORT}`);
    });



// Connect to MongoDB
connectDB().then(()=>{
    console.log("Successfull connected to MongoDB");
}).catch((error)=>{
    console.log(error);
})



