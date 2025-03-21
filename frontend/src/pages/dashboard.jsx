import { Plus } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import PollCard from '../components/polls/PollCard';
import PostCard from '../components/posts/PostCard';

const Index = () => {
    const [contentType, setContentType] = useState('all');
    const [posts, setPosts] = useState([]);
    const [polls, setPolls] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [postData, pollData] = await Promise.all([
                    API.get('/posts'),
                    API.get('/polls'),
                ]);
                setPosts(postData.data.posts || []);
                setPolls(pollData.data || []);
            } catch (error) {
                console.log('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const allContent = useMemo(() => {
        return [...posts, ...polls]
            ?.map((item) => ({
                type: item.hasOwnProperty('question') ? 'poll' : 'post',
                content: item,
                date: new Date(item.createdAt),
            }))
            .filter((item) => item.content?._id)
            .sort((a, b) => b.date - a.date);
    }, [posts, polls]);

    const renderSkeleton = () => (
        <div className="space-y-4 animate-pulse">
            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    className="bg-card border rounded-lg p-6 space-y-3"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted"></div>
                        <div className="space-y-2">
                            <div className="h-4 w-24 bg-muted rounded"></div>
                            <div className="h-3 w-16 bg-muted rounded"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-muted rounded"></div>
                        <div className="h-4 w-5/6 bg-muted rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderItems = (items, type) => (
        <div className="space-y-4">
            {items?.length &&
                items.map((item) => (
                    <div key={item._id} className="animate-slideIn">
                        {type === 'post' ? (
                            <PostCard key={item._id} post={item} />
                        ) : (
                            <PollCard key={item._id} poll={item} />
                        )}
                    </div>
                ))}
        </div>
    );

    const renderContent = () => {
        if (isLoading) return renderSkeleton();
        if (contentType === 'posts') return renderItems(posts, 'post');
        if (contentType === 'polls') return renderItems(polls, 'poll');

        return (
            <div className="space-y-4">
                {allContent?.length &&
                    allContent.map((item) => (
                        <div
                            key={`${item.type}-${item.content._id}`}
                            className="animate-slideIn"
                        >
                            {item?.type === 'post' ? (
                                <PostCard
                                    key={item.content._id}
                                    post={item.content}
                                />
                            ) : (
                                <PollCard
                                    key={item.content._id}
                                    poll={item.content}
                                />
                            )}
                        </div>
                    ))}
            </div>
        );
    };

    return (
        <div className="app-container py-8">
            <div className="text-center max-w-2xl mx-auto mb-8 fade-in">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to <span className="text-primary">ShadowVoice</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                    Share your thoughts anonymously or publicly, create polls,
                    and get AI-powered insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                    <Link to="/create-post" className="btn-primary">
                        <Plus size={16} className="mr-2" />
                        Create Post
                    </Link>
                    <Link to="/create-poll" className="btn-secondary">
                        <Plus size={16} className="mr-2" />
                        Create Poll
                    </Link>
                </div>
            </div>

            <div className="max-w-2xl mx-auto">
                <div className="flex border-b mb-6">
                    {['all', 'posts', 'polls'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setContentType(type)}
                            className={`px-4 py-2 font-medium text-sm transition-colors ${
                                contentType === type
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>

                {renderContent()}
            </div>
        </div>
    );
};

export default Index;
