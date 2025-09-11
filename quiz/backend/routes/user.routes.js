import express from "express";

import {
  registerUser,
  loginUser,
  storeUserResult,
  getLeaderboardStats,
  malwareFetch,
  devOpsFetch,
  offensiveFetch,
  defensiveFetch,
  reverseEngineerFetch,
  checkPlayed,
  eventQuizFetch,
  createRoomCode,
  getRoomByCode,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/playing-quiz", storeUserResult);
router.get("/leaderboard", getLeaderboardStats);
router.get("/malware", malwareFetch);
router.get("/devops", devOpsFetch);
router.get("/offensive", offensiveFetch);
router.get("/defensive", defensiveFetch);
router.get("/reverse-engineering", reverseEngineerFetch);
router.get("/eventquiz", eventQuizFetch);
router.get("/roomcode", createRoomCode);
router.get("/rooms/:code", getRoomByCode);

export default router;
