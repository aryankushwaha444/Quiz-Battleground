
import mongoose from "mongoose";
import fetch from "node-fetch";
import connectDB from "../db/mongoDB.connection.js";
import Questions from "../models/createQuiz.models.js";

connectDB();

// Fetch and Store
const requestUrl = "https://opentdb.com/api.php?amount=50&category=18&type=multiple";

async function getData() {
  try {
    const response = await fetch(requestUrl);
    const json = await response.json();
    const quizData = json.results;

    await Questions.deleteMany({});

    // Insert into MongoDB
    await Questions.insertMany(quizData);
    console.log("✅ Quiz data saved to MongoDB");

    mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
  }
}

getData();
