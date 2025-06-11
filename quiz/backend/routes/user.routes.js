import express from 'express';

import { registerUser , loginUser , storeUserResult, getLeaderboardStats, malwareFetch, devOpsFetch, offensiveFetch, defensiveFetch, reverseEngineerFetch } from '../controllers/user.controllers.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login',loginUser);
router.post('/playing-quiz', storeUserResult);
router.get('/leaderboard', getLeaderboardStats);
router.get('/malware',malwareFetch);
router.get('/devops',devOpsFetch);
router.get('/offensive',offensiveFetch);
router.get('/defensive',defensiveFetch);
router.get('/reverse-engineer',reverseEngineerFetch);

// GET /api/user/check-quiz-status
router.get("/check-quiz-status", async (req, res) => {
    const { email, category } = req.query;
  
    try {
      const existing = await QuizResult.findOne({
        email: email,
        nameCategory: category,
      });
  
      if (existing) {
        return res.json({ alreadyPlayed: true });
      } else {
        return res.json({ alreadyPlayed: false });
      }
    } catch (err) {
      console.error("Error checking quiz status:", err);
      res.status(500).json({ error: "Server error" });
    }
  });
  


export default router;
