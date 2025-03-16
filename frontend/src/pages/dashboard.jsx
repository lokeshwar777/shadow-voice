import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import PostCard from "../components/posts/PostCard";
import PollCard from "../components/polls/PollCard";

const Index = () => {
    const [contentType, setContentType] = useState("all");
    const [posts, setPosts] = useState([]);
    const [polls, setPolls] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            const mockPosts = [
                {
                    id: "1",
                    content: "I just launched a new project and I'm really excited about it! What do you think?",
                    authorId: "1",
                    author: {
                        id: "1",
                        name: "John Doe",
                        username: "johndoe",
                        email: "john@example.com",
                        createdAt: new Date("2022-01-15"),
                        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
                    },
                    isAnonymous: false,
                    createdAt: new Date("2022-01-15"),
                    updatedAt: new Date("2022-01-15"),
                    likes: 15,
                    comments: 2,
                },
                {
                    id: "2",
                    content: "Sometimes I feel like I'm not making enough progress in my career. Does anyone else feel this way?",
                    authorId: "2",
                    author: {
                        id: "2",
                        name: "Jane Smith",
                        username: "janesmith",
                        email: "jane@example.com",
                        createdAt: new Date("2022-02-20"),
                        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
                    },
                    isAnonymous: true,
                    createdAt: new Date("2022-02-20"),
                    updatedAt: new Date("2022-02-20"),
                    likes: 42,
                    comments: 7,
                },
            ];

            const mockPolls = [
                {
                    id: "1",
                    question: "What's your preferred way to work?",
                    options: [
                        { id: "1", text: "Remote work", votes: 25 },
                        { id: "2", text: "Office work", votes: 10 },
                        { id: "3", text: "Hybrid approach", votes: 35 },
                    ],
                    authorId: "3",
                    author: {
                        id: "3",
                        name: "Alex Rodriguez",
                        username: "alexr",
                        email: "alex@example.com",
                        createdAt: new Date("2022-03-10"),
                        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
                    },
                    isAnonymous: false,
                    createdAt: new Date("2022-03-10"),
                    totalVotes: 70,
                    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
                },
            ];

            setPosts(mockPosts);
            setPolls(mockPolls);
            setIsLoading(false);
        }, 1500);
    }, []);

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

        if (contentType === "all") {
            const allContent = [
                ...posts.map((post) => ({ type: "post", content: post, date: new Date(post.createdAt) })),
                ...polls.map((poll) => ({ type: "poll", content: poll, date: new Date(poll.createdAt) })),
            ].sort((a, b) => b.date.getTime() - a.date.getTime());

            return (
                <div className="space-y-4">
                    {allContent.map((item) => (
                        <div key={`${item.type}-${item.content.id}`} className="animate-slideIn">
                            {item.type === "post" ? <PostCard post={item.content} /> : <PollCard poll={item.content} />}
                        </div>
                    ))}
                </div>
            );
        }

        if (contentType === "posts") {
            return (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <div key={post.id} className="animate-slideIn">
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            );
        }

        if (contentType === "polls") {
            return (
                <div className="space-y-4">
                    {polls.map((poll) => (
                        <div key={poll.id} className="animate-slideIn">
                            <PollCard poll={poll} />
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <div className="app-container py-8">
            <div className="text-center max-w-2xl mx-auto mb-8 fade-in">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to <span className="text-primary">ShadowVoice</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                    Share your thoughts anonymously or publicly, create polls, and get AI-powered insights.
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
                    <button
                        onClick={() => setContentType("all")}
                        className={`px-4 py-2 font-medium text-sm transition-colors ${
                            contentType === "all" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setContentType("posts")}
                        className={`px-4 py-2 font-medium text-sm transition-colors ${
                            contentType === "posts" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        Posts
                    </button>
                    <button
                        onClick={() => setContentType("polls")}
                        className={`px-4 py-2 font-medium text-sm transition-colors ${
                            contentType === "polls" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        Polls
                    </button>
                </div>

                {renderContent()}
            </div>
        </div>
    );
};

export default Index;
