import { Router } from 'express';
import {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    updatePost,
    toggleLike,
} from '../controllers/post.controller.js';
//import { authenticateUser } from '../middlewares/auth.middleware.js';
const router = Router();

router.route('/').get(getAllPosts).post(createPost);

router.route('/:id').get(getPostById).put(updatePost).delete(deletePost);

router.patch('/:id/like', toggleLike);
export default router;
