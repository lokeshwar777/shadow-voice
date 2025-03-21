import React, { useState, useEffect } from 'react';
import PostCard from '../components/posts/PostCard';
import { Search } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/posts'); // Replace with your actual API endpoint
                if (!response.ok) throw new Error('Failed to fetch posts');

                const postsData = await response.json();

                // Fetch likes count
                const likesResponse = await fetch('/api/posts/likes-count');
                const likesData = likesResponse.ok ? await likesResponse.json() : [];

                // Fetch comments count
                const commentsResponse = await fetch('/api/posts/comments-count');
                const commentsData = commentsResponse.ok ? await commentsResponse.json() : [];

                // Create likes and comments maps
                const likesMap = new Map(likesData.map(item => [item.post_id, item.count]));
                const commentsMap = new Map(commentsData.map(item => [item.post_id, item.count]));

                // Format posts data
                const formattedPosts = postsData.map(post => ({
                    id: post.id,
                    content: post.content,
                    authorId: post.author_id,
                    author: post.is_anonymous ? undefined : {
                        id: post.author?.id || '',
                        name: post.author?.name || '',
                        username: post.author?.username || '',
                        email: post.author?.email || '',
                        image: post.author?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author?.username || post.author?.id || post.author_id}`,
                        createdAt: new Date(post.author?.created_at || post.created_at),
                        defaultAnonymous: post.author?.default_anonymous || false,
                    },
                    isAnonymous: post.is_anonymous,
                    createdAt: new Date(post.created_at),
                    updatedAt: new Date(post.updated_at),
                    likes: likesMap.get(post.id) || 0,
                    comments: commentsMap.get(post.id) || 0,
                }));

                setPosts(formattedPosts);
                setFilteredPosts(formattedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
                toast({
                    title: "Error loading posts",
                    description: "Could not load posts. Please try again later.",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [toast]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter(post =>
                post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (!post.isAnonymous && post.author?.name.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setFilteredPosts(filtered);
        }
    }, [searchQuery, posts]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="space-y-4 animate-pulse">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-card border rounded-lg p-6 space-y-3">
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
        }

        if (filteredPosts.length === 0) {
            return (
                <div className="text-center py-8">
                    <p className="text-muted-foreground">No posts found matching your search.</p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {filteredPosts.map(post => (
                    <div key={post.id} className="animate-slideIn">
                        <PostCard post={post} />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="app-container py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Posts</h1>

                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-muted-foreground" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>

                {renderContent()}
            </div>
        </div>
    );
};

export default Posts;
