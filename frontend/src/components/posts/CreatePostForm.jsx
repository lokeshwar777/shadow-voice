import { User } from 'lucide-react';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import UserAvatar from '../../components/ui/UserAvatar';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';

const CreatePostForm = () => {
    const [content, setContent] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [aiOpinion, setAiOpinion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            toast({
                title: 'Cannot create post',
                description: 'Please enter some content for your post.',
                variant: 'destructive',
            });
            return;
        }

        setIsSubmitting(true);

        const postData = {
            content,
            isAnonymous,
        };

        try {
            // console.log('postData', postData);
            const response = await API.post('/posts', postData);
            // console.log('create response', response);
            toast({
                title: 'Post created',
                description: 'Your post has been created successfully.',
            });
            navigate('/dashboard');
        } catch (error) {
            toast({
                title: 'An error occurred',
                description: 'Failed to create post. Please try again.',
                variant: 'destructive',
            });
            console.log(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleAIOpinion = async (content) => {
        if (!content.trim()) {
            toast({
                description: 'Please enter some content for AI opinion.',
            });
            return;
        }

        let opinion = `AI thinks your post is great!`;

        const prompt = `I would like to create a post with the following content: ${content} can you give me your opinion on the post?`;

        try {
            const response = await API.post('/ai/opinion', { prompt });
            // console.log('AI Opinion', response.data);
            opinion = response.data.replace('\n', '\n\n');
        } catch (error) {
            console.log(`Error: ${error.message}`);
        } finally {
            setAiOpinion(opinion);
        }
    };

    return (
        <div className="animate-fadeIn">
            <div className="space-y-4">
                <h1 className="text-2xl font-bold text-center">Create Post</h1>

                <div className="bg-card border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="relative">
                            <UserAvatar user={user} isAnonymous={isAnonymous} />
                            {isAnonymous && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                    <User size={12} className="text-white" />
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="font-medium">
                                {isAnonymous ? 'Anonymous' : user?.name}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                                <label
                                    htmlFor="anonymous-toggle"
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            id="anonymous-toggle"
                                            className="sr-only"
                                            checked={isAnonymous}
                                            onChange={() =>
                                                setIsAnonymous(!isAnonymous)
                                            }
                                        />
                                        <div
                                            className={`block w-10 h-6 rounded-full transition-colors ${
                                                isAnonymous
                                                    ? 'bg-primary'
                                                    : 'bg-muted'
                                            }`}
                                        ></div>
                                        <div
                                            className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                                                isAnonymous
                                                    ? 'translate-x-4'
                                                    : 'translate-x-0'
                                            }`}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        Post anonymously
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full min-h-[150px] p-3 rounded-md border bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <button
                            type="button"
                            onClick={() => handleAIOpinion(content)}
                            className="px-4 py-2 border rounded-md bg-grey-400 text-black  hover:bg-blue-600 hover:text-white transition-colors mt-4"
                        >
                            Get AI Opinion
                        </button>
                        {aiOpinion && (
                            <div className="w-full max-h-[200px] p-3 mt-4 rounded-md border bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent overflow-scroll">
                                <ReactMarkdown>{aiOpinion}</ReactMarkdown>
                            </div>
                        )}
                        <div className="flex justify-end items-center gap-3 mt-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || !content.trim()}
                                className="btn-primary"
                            >
                                {isSubmitting ? 'Posting...' : 'Post'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePostForm;
