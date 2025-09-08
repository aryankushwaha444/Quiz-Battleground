import express from 'express';
const router = express.Router();

router.get('/bac', (req, res) => {
  res.json({ message: '✅ Backend is connected to frontend!' });
});

export default router;
