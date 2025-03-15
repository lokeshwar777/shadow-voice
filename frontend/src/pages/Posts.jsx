import React, { useState, useEffect } from 'react';
import PostCard from '../components/posts/PostCard';
import { Search } from 'lucide-react';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setTimeout(() => {
            const mockPosts = [
                {
                    id: '1',
                    content: "I just launched a new project and I'm really excited about it! What do you think?",
                    authorId: '1',
                    author: {
                        id: '1',
                        name: 'John Doe',
                        username: 'johndoe',
                        email: 'john@example.com',
                        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
                    },
                    isAnonymous: false,
                    likes: 15,
                    comments: 2,
                },
                {
                    id: '2',
                    content: "Sometimes I feel like I'm not making enough progress in my career. Does anyone else feel this way?",
                    authorId: '2',
                    author: {
                        id: '2',
                        name: 'Jane Smith',
                        username: 'janesmith',
                        email: 'jane@example.com',
                        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
                    },
                    isAnonymous: true,
                    likes: 42,
                    comments: 7,
                },
            ];

            setPosts(mockPosts);
            setFilteredPosts(mockPosts);
            setIsLoading(false);
        }, 1000);
    }, []);

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
            return <p>Loading posts...</p>;
        }
        if (filteredPosts.length === 0) {
            return <p>No posts found.</p>;
        }
        return (
            <div>
                {filteredPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        );
    };

    return (
        <div>
            <h1>Posts</h1>
            <div>
                <Search size={18} />
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {renderContent()}
        </div>
    );
};

export default Posts;
