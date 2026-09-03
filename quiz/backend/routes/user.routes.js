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
} from "../controllers/user.controllers.js";

import {
  registerLimiter,
  loginLimiter,
  resultLimiter,
  quizLimiter,
} from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

router.post("/register", registerLimiter, registerUser);
router.post("/login", loginLimiter, loginUser);
router.post("/playing-quiz", resultLimiter, storeUserResult);
router.get("/leaderboard", quizLimiter, getLeaderboardStats);
router.get("/malware", quizLimiter, malwareFetch);
router.get("/devops", quizLimiter, devOpsFetch);
router.get("/offensive", quizLimiter, offensiveFetch);
router.get("/defensive", quizLimiter, defensiveFetch);
router.get("/reverse-engineering", quizLimiter, reverseEngineerFetch);
router.get("/eventquiz", quizLimiter, eventQuizFetch);

export default router;
