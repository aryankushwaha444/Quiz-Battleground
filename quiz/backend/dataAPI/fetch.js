import connectDB from "../db/mongoDB.connection.js";
import Questions from "../models/createQuiz.models.js";

connectDB();


async function fetchQuizData() {
  try {

    const allQuizzes = await Questions.find(); // Fetch all documents
    console.log("Quiz Data Fetched:");
    console.log(allQuizzes);
    process.exit(0);
  } catch (error) {
    console.error("Fetch Error:", error.message);
    process.exit(1);
  }
}

fetchQuizData();
