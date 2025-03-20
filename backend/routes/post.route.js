import { Router } from 'express';
import {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    updatePost,
} from '../controllers/post.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/').get(authenticateUser, getAllPosts).post(createPost);

router.route('/:id').get(getPostById).put(updatePost).delete(deletePost);

export default router;
