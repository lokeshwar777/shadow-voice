import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import UserAvatar from '../../components/ui/UserAvatar';
import { cn } from '../../lib/utils';

const PostCard = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes.length || 0);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState(post.comments || []);
    const [newComment, setNewComment] = useState('');

    const handleLike = async () => {
        try {
            const response = await API.patch(`/posts/${post.id}/like`);
            setLikeCount(response.data.likes);
            setLiked(!liked);
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    const toggleComments = () => {
        setShowComments((prev) => !prev);
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() === '') return;
    
        try {
            const response = await API.post('/api/comments', {
                postId: post.id,
                content: newComment,
                isAnonymous: post.isAnonymous,
            });
    
            setComments([...comments, response.data.comment]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
        addSuffix: true,
    });

    return (
        <div className="bg-card border rounded-lg overflow-hidden transition-all duration-300 card-hover animate-fadeIn">
            <div className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <UserAvatar
                            user={post.author || null}
                            isAnonymous={post.isAnonymous}
                        />
                        <div>
                            <h3 className="font-medium text-card-foreground">
                                {post.isAnonymous
                                    ? 'Anonymous'
                                    : post.author?.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                {timeAgo}
                            </p>
                        </div>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground rounded-full p-1 transition-colors">
                        <MoreHorizontal size={18} />
                    </button>
                </div>

                <div className="mt-3">
                    <p className="text-card-foreground">{post.content}</p>
                </div>
            </div>

            {/* Actions */}
            <div className="border-t flex items-center justify-between px-4 py-2">
                <button
                    onClick={handleLike}
                    className={cn(
                        'flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-md transition-colors',
                        liked
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    )}
                >
                    <ThumbsUp
                        size={16}
                        className={liked ? 'fill-primary' : ''}
                    />
                    <span>{likeCount}</span>
                </button>

                <button
                    onClick={toggleComments}
                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 px-2 py-1 rounded-md transition-colors"
                >
                    <MessageSquare size={16} />
                    <span>{comments.length}</span>
                </button>

                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 px-2 py-1 rounded-md transition-colors">
                    <Share2 size={16} />
                    <span>Share</span>
                </button>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="p-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Comments</h4>
                    <div className="space-y-2">
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="bg-muted p-2 rounded-md"
                                >
                                    <p className="text-xs font-semibold">
                                        {comment.author}
                                    </p>
                                    <p className="text-sm">{comment.text}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-muted-foreground">
                                No comments yet.
                            </p>
                        )}
                    </div>

                    {/* Add Comment */}
                    <div className="mt-3 flex items-center gap-2">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="flex-1 p-2 border rounded-md text-sm"
                            placeholder="Write a comment..."
                        />
                        <button
                            onClick={handleCommentSubmit}
                            className="text-sm px-3 py-1 bg-primary text-white rounded-md"
                        >
                            Post
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCard;
