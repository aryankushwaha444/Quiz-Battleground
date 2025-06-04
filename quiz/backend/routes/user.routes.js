import express from 'express';

import userRegister from '../controllers/user.controllers.js';

const router = express.Router();

router.post('/register', userRegister);

export default router;

