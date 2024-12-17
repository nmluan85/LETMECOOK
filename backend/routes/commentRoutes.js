import express from 'express';
import { createComment, replyComment, reactToComment } from '../controllers/commentController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.post('/reply', verifyToken, replyComment);
router.post('/react', verifyToken, reactToComment);

export default router;