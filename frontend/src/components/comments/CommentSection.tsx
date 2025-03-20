import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';
import UserAvatar from '../../components/ui/UserAvatar.jsx';
import { Send, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const CommentSection = ({ contentId, contentType }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    const { toast } = useToast();

    useEffect(() => {
        if (!contentId) return;
        fetchComments();
    }, [contentId]);

    const fetchComments = async () => {
        setIsLoading(true);
        try {
            // Replace with actual API call
            const response = await fetch(`/api/comments?contentId=${contentId}&contentType=${contentType}`);
            const data = await response.json();
            setComments(data);
        } catch (error) {
            toast({ title: "Error", description: "Failed to load comments.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!user || !newComment.trim()) return;

        setIsSubmitting(true);
        try {
            // Replace with actual API call
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: newComment.trim(),
                    author_id: user.id,
                    is_anonymous: isAnonymous,
                    contentId,
                    contentType,
                }),
            });
            const data = await response.json();
            setComments([...comments, data]);
            setNewComment('');
        } catch (error) {
            toast({ title: "Error", description: "Failed to submit comment.", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            // Replace with actual API call
            await fetch(`/api/comments/${commentId}`, { method: 'DELETE' });
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete comment.", variant: "destructive" });
        }
    };

    return (
        <div className="border-t px-4 py-3">
            <h3 className="text-sm font-medium mb-3">Comments</h3>
            {isLoading ? <p>Loading comments...</p> : (
                <div className="space-y-4 mb-4 max-h-80 overflow-y-auto">
                    {comments.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-2">No comments yet.</p>
                    ) : (
                        comments.map(comment => (
                            <div key={comment.id} className="flex items-start gap-2">
                                <UserAvatar user={comment.is_anonymous ? null : comment.author} isAnonymous={comment.is_anonymous} size="sm" />
                                <div className="flex-1">
                                    <div className="bg-muted/50 rounded-lg p-2">
                                        <p className="text-xs font-medium">{comment.is_anonymous ? 'Anonymous' : comment.author?.username}</p>
                                        <p className="text-sm mt-1">{comment.content}</p>
                                        {user?.id === comment.author_id && (
                                            <button onClick={() => handleDeleteComment(comment.id)} className="text-muted-foreground hover:text-destructive">
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
            {user && (
                <form onSubmit={handleSubmitComment} className="mt-3 flex gap-2">
                    <UserAvatar user={isAnonymous ? null : user} isAnonymous={isAnonymous} size="sm" />
                    <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." className="w-full px-3 py-2 border rounded-full" />
                    <button type="submit" disabled={isSubmitting || !newComment.trim()} className="text-primary">
                        <Send size={16} />
                    </button>
                </form>
            )}
        </div>
    );
};

export default CommentSection;
