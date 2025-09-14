import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "../db/mongoDB.connection.js";
import malwares from "../models/malware.models.js";
import Offensive from "../models/offensive.models.js";
import defensive from "../models/defensive.models.js";
import devOps from "../models/devOps.models.js";
import reverseEngineering from "../models/reverseEngineering.models.js";
import EventQuiz from "../models/eventQuiz.model.js";

// Resolve directory of this file to make relative paths reliable
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

async function insertDataFromFile() {
  try {
    //Get file paths
    const filePathDef = path.join(__dirname, "defensive.questions.json");
    const filePathOff = path.join(__dirname, "offensive_questions.json");
    const filePathMal = path.join(__dirname, "malware.questions.json");
    const filePathDevOps = path.join(__dirname, "devOps.questions.json");
    const filePathRevEng = path.join(
      __dirname,
      "reverseEngineering.questions.json"
    );
    const filePathEventQuiz = path.join(__dirname, "eventQuiz.json");

    //Read files as strings
    const fileDataDef = fs.readFileSync(filePathDef, "utf-8");
    const fileDataOff = fs.readFileSync(filePathOff, "utf-8");
    const fileDataMal = fs.readFileSync(filePathMal, "utf-8");
    const fileDataDevOps = fs.readFileSync(filePathDevOps, "utf-8");
    const fileDataRevEng = fs.readFileSync(filePathRevEng, "utf-8");
    const fileDataEventQuiz = fs.readFileSync(filePathEventQuiz, "utf-8");

    //Converts JSON String to JS array/objects
    const jsonDataDef = JSON.parse(fileDataDef);
    const jsonDataOff = JSON.parse(fileDataOff);
    const jsonDataMal = JSON.parse(fileDataMal);
    const jsonDataDevOps = JSON.parse(fileDataDevOps);
    const jsonDataRevEng = JSON.parse(fileDataRevEng);
    const jsonDataEventQuiz = JSON.parse(fileDataEventQuiz);

    // Insert into DB
    console.time("Insert Malware");
    await malwares.insertMany(jsonDataMal);
    console.timeEnd("Insert Malware");

    await Offensive.insertMany(jsonDataOff);
    await defensive.insertMany(jsonDataDef);
    await devOps.insertMany(jsonDataDevOps);
    await reverseEngineering.insertMany(jsonDataRevEng);
    await EventQuiz.insertMany(jsonDataEventQuiz);
    await console.log(" Questions inserted successfully!");
    mongoose.disconnect();
  } catch (error) {
    console.error(" Error inserting result:", error.message);
  }
}

insertDataFromFile();
