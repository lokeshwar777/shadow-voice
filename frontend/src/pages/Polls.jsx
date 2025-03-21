import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import API from '../api';
import PollCard from '../components/polls/PollCard';

const Polls = () => {
    const [polls, setPolls] = useState([]);
    const [filteredPolls, setFilteredPolls] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const pollData = await API.get('/polls');
                setPolls(pollData.data || []);
            } catch (error) {
                console.log('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredPolls(polls);
        } else {
            const filtered = polls.filter(
                (poll) =>
                    poll.question
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    poll.options.some((option) =>
                        option.text
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                    ) ||
                    (!poll.isAnonymous &&
                        poll.author?.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()))
            );
            setFilteredPolls(filtered);
        }
    }, [searchQuery, polls]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="space-y-4 animate-pulse">
                    {[1, 2].map((i) => (
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
                            <div className="h-5 w-3/4 bg-muted rounded mb-4"></div>
                            <div className="space-y-3">
                                {[1, 2, 3].map((j) => (
                                    <div
                                        key={j}
                                        className="h-10 bg-muted rounded"
                                    ></div>
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
                    <p className="text-muted-foreground">
                        No polls found matching your search.
                    </p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {filteredPolls.map((poll) => (
                    <div key={poll._id} className="animate-slideIn">
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
