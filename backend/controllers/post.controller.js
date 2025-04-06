import { Post } from '../models/post.model.js';

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name username')
            .lean()
            .sort({ createdAt: -1 });

        // Replace `null` authors with "Anonymous"
        const formattedPosts = posts.map((post) => ({
            ...post,
            author: post.isAnonymous ? 'Anonymous' : post.author,
        }));

        res.status(200).json({
            success: true,
            message: 'posts fetched succesfully',
            posts: formattedPosts,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getPostById = async (req, res) => {
    const { id: postId } = req.params;
    // console.log('get by id', req);
    try {
        const post = await Post.findById(postId)
            .populate('author', 'name username')
            .lean();
        if (!post) {
            return res
                .status(404)
                .json({ success: false, message: 'post not found' });
        }

        // Replace `null` authors with "Anonymous"
        const formattedPost = {
            ...post,
            author: post.isAnonymous ? 'Anonymous' : post.author,
        };

        res.status(200).json({
            success: true,
            message: 'post fetched succesfully',
            post: formattedPost,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createPost = async (req, res) => {
    // console.log('create', req);
    const { content, isAnonymous } = req.body;
    try {
        if (!content) {
            return res
                .status(400)
                .json({ success: false, message: 'content is required' });
        }
        // console.log('isAnonymous', isAnonymous);
        const newPost = await Post.create({
            content,
            isAnonymous,
            author: !isAnonymous ? req.user : null,
        });

        const savedPost = await newPost.populate('author', 'name username');
        if (!savedPost) {
            return res
                .status(400)
                .json({ success: false, message: 'failed to create post' });
        }

        res.status(201).json({
            success: true,
            message: 'post created successfully',
            post: savedPost,
        });
        // console.log('res', res);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updatePost = async (req, res) => {
    res.json({ message: 'PUT update post' });
};

const deletePost = async (req, res) => {
    // console.log('delete', req);
    const { id: postId } = req.params;
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res
                .status(404)
                .json({ success: false, message: 'post not found' });
        }

        res.status(200).json({
            success: true,
            message: 'post deleted succesfully',
            post: deletedPost,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const toggleLike = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id; // Assuming user is authenticated

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // Check if the user already liked the post
        const hasLiked = post.likes.includes(userId);

        if (hasLiked) {
            // Unlike the post
            post.likes = post.likes.filter((id) => id.toString() !== userId);
        } else {
            // Like the post
            post.likes.push(userId);
        }

        await post.save();

        res.status(200).json({
            success: true,
            message: hasLiked ? 'Post unliked' : 'Post liked',
            likes: post.likes.length,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export { createPost, deletePost, getAllPosts, getPostById, updatePost, toggleLike };
