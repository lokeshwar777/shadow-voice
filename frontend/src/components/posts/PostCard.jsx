import React, { useState, useEffect } from 'react';
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal, Trash2, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import UserAvatar from '../../components/ui/UserAvatar';
import CommentSection from '../../components/comments/CommentSection';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';

const PostCard = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [showComments, setShowComments] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { user } = useAuth();
    const { toast } = useToast();

    useEffect(() => {
        if (!user) return;

        // Placeholder for checking like status (Replace with actual API call if needed)
        const checkLikeStatus = async () => {
            const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
            setLiked(!!likedPosts[post.id]);
        };

        checkLikeStatus();
    }, [post.id, user]);

    const handleLike = () => {
        if (!user) {
            toast({ title: "Authentication required", description: "You must be logged in to like posts.", variant: "destructive" });
            return;
        }

        const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
        if (liked) {
            delete likedPosts[post.id];
            setLikeCount(prev => prev - 1);
        } else {
            likedPosts[post.id] = true;
            setLikeCount(prev => prev + 1);
        }
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
        setLiked(!liked);
    };

    const handleDelete = () => {
        if (!user || user.id !== post.authorId) {
            toast({ title: "Unauthorized", description: "You can only delete your own posts.", variant: "destructive" });
            return;
        }

        setIsDeleting(true);

        setTimeout(() => {
            toast({ title: "Post deleted", description: "Your post has been deleted successfully." });
            setIsDeleting(false);
            setShowDeleteConfirm(false);
        }, 1000);
    };

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({ title: 'Check out this post', text: post.content, url: window.location.href });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                toast({ title: "Link copied", description: "Post link copied to clipboard!" });
            }
        } catch (error) {
            console.error('Error sharing post:', error);
        }
    };

    const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
    const isAuthor = user && user.id === post.authorId;

    return (
        <div className="bg-card border rounded-lg overflow-hidden transition-all duration-300">
            <div className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <UserAvatar user={post.author || null} isAnonymous={post.isAnonymous} />
                        <div>
                            <h3 className="font-medium text-card-foreground">{post.isAnonymous ? 'Anonymous' : post.author?.name}</h3>
                            <p className="text-xs text-muted-foreground">{timeAgo}</p>
                        </div>
                    </div>
                    {isAuthor && (
                        <div className="relative">
                            <button className="text-muted-foreground hover:text-foreground rounded-full p-1" onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}>
                                <MoreHorizontal size={18} />
                            </button>
                            {showDeleteConfirm && (
                                <div className="absolute right-0 top-8 bg-background border rounded-md shadow-md p-3 w-56">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="text-sm font-medium">Delete post?</h4>
                                        <button onClick={() => setShowDeleteConfirm(false)} className="text-muted-foreground hover:text-foreground">
                                            <X size={16} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-3">This action cannot be undone.</p>
                                    <button onClick={handleDelete} disabled={isDeleting} className="w-full flex items-center justify-center gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 text-sm px-3 py-2 rounded-md">
                                        <Trash2 size={14} />
                                        {isDeleting ? 'Deleting...' : 'Delete Post'}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="mt-3">
                    <p className="text-card-foreground">{post.content}</p>
                </div>
            </div>
            <div className="border-t flex items-center justify-between px-4 py-2">
                <button onClick={handleLike} className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-md ${liked ? 'text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
                    <ThumbsUp size={16} className={liked ? 'fill-primary' : ''} />
                    <span>{likeCount}</span>
                </button>
                <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 px-2 py-1 rounded-md">
                    <MessageSquare size={16} />
                    <span>{post.comments}</span>
                </button>
                <button onClick={handleShare} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 px-2 py-1 rounded-md">
                    <Share2 size={16} />
                    <span>Share</span>
                </button>
            </div>
            {showComments && <CommentSection contentId={post.id} contentType="post" />}
        </div>
    );
};

export default PostCard;
