import { Router } from 'express';
import {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    updatePost,
} from '../controllers/post.controller.js';

const router = Router();

router.route('/').get(getAllPosts).post(createPost);

router.route('/:id').get(getPostById).put(updatePost).delete(deletePost);

export default router;
