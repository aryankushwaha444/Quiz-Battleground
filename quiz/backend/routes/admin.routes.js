import express from 'express';

import {registerAdmin , loginAdmin, offensiveStore, defensiveStore, devOpsStore, malwaresStore, reverseEngineerStore, eventQuizStore} from '../controllers/admin.controllers.js';

const router = express.Router();
router.post('/register', registerAdmin);
router.post('/login' ,loginAdmin);

router.post('/offensive',offensiveStore);
router.post('/devops',devOpsStore);
router.post('/malware',malwaresStore);
router.post('/defensive',defensiveStore);
router.post('/reverse-engineering',reverseEngineerStore);
router.post('/eventquiz',eventQuizStore);

export default router;  