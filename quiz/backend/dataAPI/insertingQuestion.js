import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import connectDB from "../db/mongoDB.connection.js";
import malwares from "../models/malware.models.js";
import Offensive from "../models/offensive.models.js";
import defensive from "../models/defensive.models.js";
import devOps from "../models/devOps.models.js";
import reverseEngineering from "../models/reverseEngineering.models.js";

connectDB();

async function insertDataFromFile() {
  try {
    const filePathDef = path.resolve("../dataAPI/defensive.questions.json");
    const filePathOff = path.resolve("../dataAPI/offensive.questions.json");
    const filePathMal = path.resolve("../dataAPI/malware.questions.json");
    const filePathDevOps = path.resolve("../dataAPI/devOps.questions.json");
    const filePathRevEng = path.resolve("../dataAPI/reverseEngineering.questions.json");

    const fileDataDef = fs.readFileSync(filePathDef, "utf-8");
    const fileDataOff = fs.readFileSync(filePathOff, "utf-8");
    const fileDataMal = fs.readFileSync(filePathMal, "utf-8");
    const fileDataDevOps = fs.readFileSync(filePathDevOps, "utf-8");
    const fileDataRevEng = fs.readFileSync(filePathRevEng, "utf-8");

    const jsonDataDef = JSON.parse(fileDataDef);
    const jsonDataOff = JSON.parse(fileDataOff);
    const jsonDataMal = JSON.parse(fileDataMal);
    const jsonDataDevOps = JSON.parse(fileDataDevOps);
    const jsonDataRevEng = JSON.parse(fileDataRevEng);

    console.time("Insert Malware");
    await malwares.insertMany(jsonDataMal);
    console.timeEnd("Insert Malware");

    
    await Offensive.insertMany(jsonDataOff);
    await defensive.insertMany(jsonDataDef);
    await devOps.insertMany(jsonDataDevOps);
    await reverseEngineering.insertMany(jsonDataRevEng);

    console.log("✅ Questions inserted successfully!");
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error inserting result:", error.message);
  }
}

insertDataFromFile();
