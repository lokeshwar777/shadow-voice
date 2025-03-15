import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserAvatar from '../components/ui/UserAvatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import PostCard from '../components/posts/PostCard';
import PollCard from '../components/polls/PollCard';
import { User } from 'lucide-react';

const Profile = () => {
    const { user, isLoading } = useAuth();
    const [defaultAnonymous, setDefaultAnonymous] = useState(false);

    const userPosts = [
        {
            id: '1',
            content: 'Just experienced the most amazing sunset at the beach. Natures beauty is truly breathtaking sometimes.',
            authorId: user?.id || '',
            author: user || undefined,
            isAnonymous: false,
            createdAt: new Date('2022-03-05'),
            updatedAt: new Date('2022-03-05'),
            likes: 24,
            comments: 5,
        },
        {
            id: '2',
            content: 'Just finished reading "Atomic Habits" and it completely changed my perspective on building good routines.',
            authorId: user?.id || '',
            author: user || undefined,
            isAnonymous: false,
            createdAt: new Date('2022-03-08'),
            updatedAt: new Date('2022-03-08'),
            likes: 42,
            comments: 7,
        },
    ];

    const userPolls = [
        {
            id: '1',
            question: 'Whats your preferred way to work?',
                options: [
        { id: '1', text: 'Remote work', votes: 25 },
        { id: '2', text: 'Office work', votes: 10 },
        { id: '3', text: 'Hybrid approach', votes: 35 },
    ],
        authorId: user?.id || '',
        author: user || undefined,
        isAnonymous: false,
        createdAt: new Date('2022-03-10'),
        totalVotes: 70,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
},
];

    if (isLoading) {
        return (
            <div className="app-container py-8">
                <div className="max-w-3xl mx-auto animate-pulse">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-muted"></div>
                        <div className="space-y-2">
                            <div className="h-6 w-48 bg-muted rounded"></div>
                            <div className="h-4 w-32 bg-muted rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container py-8 animate-fadeIn">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-6">Profile</h1>
                    <div className="bg-card border rounded-lg p-6">
                        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                            <UserAvatar user={user} size="lg" />
                            <div className="text-center md:text-left">
                                <h2 className="text-xl font-semibold">{user?.name}</h2>
                                <p className="text-muted-foreground">Member since {new Date(user?.createdAt || '').toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-4">Your Content</h2>
                    <div className="bg-card border rounded-lg">
                        <Tabs defaultValue="posts">
                            <TabsList className="w-full border-b rounded-none justify-start">
                                <TabsTrigger value="posts" className="flex-1 md:flex-none">Posts</TabsTrigger>
                                <TabsTrigger value="polls" className="flex-1 md:flex-none">Polls</TabsTrigger>
                            </TabsList>

                            <TabsContent value="posts" className="p-4">
                                {userPosts.length > 0 ? (
                                    <div className="space-y-4">
                                        {userPosts.map(post => (
                                            <PostCard key={post.id} post={post} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center py-8 text-muted-foreground">You haven't created any posts yet.</p>
                                )}
                            </TabsContent>

                            <TabsContent value="polls" className="p-4">
                                {userPolls.length > 0 ? (
                                    <div className="space-y-4">
                                        {userPolls.map(poll => (
                                            <PollCard key={poll.id} poll={poll} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center py-8 text-muted-foreground">You haven't created any polls yet.</p>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
