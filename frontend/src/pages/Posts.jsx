import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import PostCard from '../components/posts/PostCard';
import useAxiosFetch from '../hooks/useAxiosFetch';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [data, isLoading, fetchError] = useAxiosFetch('/api/posts');

    useEffect(() => {
        // console.log('data', data);
        setPosts(data || []);
    }, [data]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter(
                (post) =>
                    post.content
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    (!post.isAnonymous &&
                        post.author?.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()))
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
                {filteredPosts.map((post) => (
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
