import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import UserAvatar from '../../components/ui/UserAvatar';
import { cn } from '../../lib/utils';

const PostCard = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);

    const handleLike = () => {
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
        setLiked(!liked);
    };

    const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

    return (
        <div className="bg-card border rounded-lg overflow-hidden transition-all duration-300 card-hover animate-fadeIn">
            <div className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <UserAvatar user={post.author || null} isAnonymous={post.isAnonymous} />
                        <div>
                            <h3 className="font-medium text-card-foreground">
                                {post.isAnonymous ? 'Anonymous' : post.author?.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">{timeAgo}</p>
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
                        "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-md transition-colors",
                        liked
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                >
                    <ThumbsUp size={16} className={liked ? "fill-primary" : ""} />
                    <span>{likeCount}</span>
                </button>

                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 px-2 py-1 rounded-md transition-colors">
                    <MessageSquare size={16} />
                    <span>{post.comments}</span>
                </button>

                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 px-2 py-1 rounded-md transition-colors">
                    <Share2 size={16} />
                    <span>Share</span>
                </button>
            </div>
        </div>
    );
};

export default PostCard;
