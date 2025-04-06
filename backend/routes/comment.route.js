import express from 'express';
import { addComment } from '../controllers/comment.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Route to add a comment
router.post('/', authenticateUser, addComment);

export default router;