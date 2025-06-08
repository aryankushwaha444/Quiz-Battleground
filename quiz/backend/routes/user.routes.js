import express from 'express';

import { registerUser , loginUser , storeUserResult, getLeaderboardStats } from '../controllers/user.controllers.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login',loginUser);
router.post('/playing-quiz', storeUserResult);
router.get('/leaderboard', getLeaderboardStats);


export default router;
