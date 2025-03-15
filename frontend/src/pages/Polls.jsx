import React, { useState, useEffect } from 'react';
import PollCard from '../components/polls/PollCard';
import { Search } from 'lucide-react';

const Polls = () => {
    const [polls, setPolls] = useState([]);
    const [filteredPolls, setFilteredPolls] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setTimeout(() => {
            const mockPolls = [
                {
                    id: '1',
                    question: "What's your preferred way to work?",
                    options: [
                        { id: '1', text: 'Remote work', votes: 25 },
                        { id: '2', text: 'Office work', votes: 10 },
                        { id: '3', text: 'Hybrid approach', votes: 35 },
                    ],
                    authorId: '3',
                    author: {
                        id: '3',
                        name: 'Alex Rodriguez',
                        username: 'alexr',
                        email: 'alex@example.com',
                        createdAt: new Date('2022-03-10'),
                        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
                    },
                    isAnonymous: false,
                    createdAt: new Date('2022-03-10'),
                    totalVotes: 70,
                    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
                },
                {
                    id: '2',
                    question: 'Which programming language do you prefer?',
                    options: [
                        { id: '1', text: 'JavaScript', votes: 42 },
                        { id: '2', text: 'Python', votes: 38 },
                        { id: '3', text: 'Java', votes: 15 },
                        { id: '4', text: 'C#', votes: 20 },
                        { id: '5', text: 'Other', votes: 10 },
                    ],
                    authorId: '2',
                    author: {
                        id: '2',
                        name: 'Jane Smith',
                        username: 'janesmith',
                        email: 'jane@example.com',
                        createdAt: new Date('2022-02-20'),
                        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
                    },
                    isAnonymous: true,
                    createdAt: new Date('2022-03-15'),
                    totalVotes: 125,
                },
                {
                    id: '3',
                    question: "What's your favorite season?",
                    options: [
                        { id: '1', text: 'Spring', votes: 30 },
                        { id: '2', text: 'Summer', votes: 45 },
                        { id: '3', text: 'Fall', votes: 50 },
                        { id: '4', text: 'Winter', votes: 20 },
                    ],
                    authorId: '4',
                    author: {
                        id: '4',
                        name: 'Jamie Smith',
                        username: 'jamies',
                        email: 'jamie@example.com',
                        createdAt: new Date('2022-03-08'),
                        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie',
                    },
                    isAnonymous: false,
                    createdAt: new Date('2022-03-20'),
                    totalVotes: 145,
                },
            ];

            setPolls(mockPolls);
            setFilteredPolls(mockPolls);
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredPolls(polls);
        } else {
            const filtered = polls.filter(poll =>
                poll.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                poll.options.some(option => option.text.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (!poll.isAnonymous && poll.author?.name.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setFilteredPolls(filtered);
        }
    }, [searchQuery, polls]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="space-y-4 animate-pulse">
                    {[1, 2].map((i) => (
                        <div key={i} className="bg-card border rounded-lg p-6 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-muted"></div>
                                <div className="space-y-2">
                                    <div className="h-4 w-24 bg-muted rounded"></div>
                                    <div className="h-3 w-16 bg-muted rounded"></div>
                                </div>
                            </div>
                            <div className="h-5 w-3/4 bg-muted rounded mb-4"></div>
                            <div className="space-y-3">
                                {[1, 2, 3].map((j) => (
                                    <div key={j} className="h-10 bg-muted rounded"></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (filteredPolls.length === 0) {
            return (
                <div className="text-center py-8">
                    <p className="text-muted-foreground">No polls found matching your search.</p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {filteredPolls.map(poll => (
                    <div key={poll.id} className="animate-slideIn">
                        <PollCard poll={poll} />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="app-container py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Polls</h1>

                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-muted-foreground" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search polls..."
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

export default Polls;
