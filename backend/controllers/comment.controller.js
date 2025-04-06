import { Comment } from "../models/comment.model";
import { Post } from "../models/post.model";

export const addComment = async (req, res) => {
    const { postId, content, isAnonymous } = req.body;
    const userId = req.user.id; // Assuming user is authenticated

    try {
        // Create a new comment
        const newComment = await Comment.create({
            content,
            author: userId,
            isAnonymous,
            postId,
        });

        // Add the comment to the post
        await Post.findByIdAndUpdate(postId, {
            $push: { comments: newComment._id },
        });

        res.status(201).json({
            success: true,
            message: 'Comment added successfully',
            comment: newComment,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};