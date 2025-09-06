import express from 'express';

import { registerUser , loginUser , storeUserResult, getLeaderboardStats, malwareFetch, devOpsFetch, offensiveFetch, defensiveFetch, reverseEngineerFetch, checkPlayed } from '../controllers/user.controllers.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login',loginUser);
router.post('/playing-quiz', storeUserResult);
router.get('/leaderboard', getLeaderboardStats);
router.get('/malware',malwareFetch);
router.get('/devops',devOpsFetch);
router.get('/offensive',offensiveFetch);
router.get('/defensive',defensiveFetch);
router.get('/reverse-engineering',reverseEngineerFetch);




export default router;
