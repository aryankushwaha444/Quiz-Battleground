import express from 'express';

import {registerAdmin , createQuiz, loginAdmin} from '../controllers/admin.controllers.js';

const router = express.Router();
router.post('/register', registerAdmin);
router.post('/login' ,loginAdmin);
router.post('/create-quiz', createQuiz)

export default router;  