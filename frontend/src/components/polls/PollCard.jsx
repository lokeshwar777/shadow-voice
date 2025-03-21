import { formatDistanceToNow } from 'date-fns';
import { BarChart2, MoreHorizontal, Share2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import API from '../../api';
import UserAvatar from '../../components/ui/UserAvatar';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';

const PollCard = ({ poll }) => {
    const { user } = useAuth();
    const [selectedOption, setSelectedOption] = useState(null);
    const [hasVoted, setHasVoted] = useState(poll.voters.includes(user?._id)); // Check if user voted
    const [pollData, setPollData] = useState(poll.options);

    useEffect(() => {
        const fetchPollData = async () => {
            try {
                const response = await API.get(`/polls/${poll._id}`);
                setPollData(response.data.options);
            } catch (error) {
                console.error('Failed to fetch updated poll data:', error);
            }
        };

        fetchPollData();
    }, [poll]);

    const handleVote = async (optionIndex) => {
        if (hasVoted) return;

        try {
            const response = await API.post(`/polls/${poll._id}/vote`, {
                optionIndex,
            });

            setSelectedOption(optionIndex);
            setHasVoted(true);
            setPollData(response.data.poll.options);
        } catch (error) {
            console.error('Voting failed:', error);
        }
    };

    const totalVotes = pollData.reduce((sum, option) => sum + option.votes, 0);
    const timeAgo = formatDistanceToNow(new Date(poll.createdAt), {
        addSuffix: true,
    });

    return (
        <div className="bg-card border rounded-lg overflow-hidden transition-all duration-300 card-hover animate-fadeIn">
            <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <UserAvatar
                            user={poll.author}
                            isAnonymous={poll.isAnonymous}
                        />
                        <div>
                            <h3 className="font-medium text-card-foreground">
                                {poll.isAnonymous
                                    ? 'Anonymous'
                                    : poll.author.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                {timeAgo}
                            </p>
                        </div>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground rounded-full p-1 transition-colors">
                        <MoreHorizontal size={18} />
                    </button>
                </div>

                {/* Poll Question */}
                <div className="mt-3 mb-4">
                    <h4 className="text-lg font-medium mb-4">
                        {poll.question}
                    </h4>

                    {/* Poll Options */}
                    <div className="space-y-3">
                        {pollData.map((option, index) => {
                            const percentage =
                                totalVotes > 0
                                    ? Math.round(
                                          (option.votes / totalVotes) * 100
                                      )
                                    : 0;

                            return (
                                <div key={option._id} className="relative">
                                    <button
                                        onClick={() => handleVote(index)}
                                        disabled={hasVoted}
                                        className={cn(
                                            'w-full text-left p-3 rounded-md border transition-all relative z-10',
                                            hasVoted
                                                ? 'cursor-default'
                                                : 'hover:border-primary hover:bg-primary/5 cursor-pointer',
                                            selectedOption === index &&
                                                'border-primary bg-primary/5'
                                        )}
                                    >
                                        <div className="flex justify-between">
                                            <span>{option.text}</span>
                                            {hasVoted && (
                                                <span className="font-medium">
                                                    {percentage}%
                                                </span>
                                            )}
                                        </div>
                                    </button>

                                    {hasVoted && (
                                        <div
                                            className={cn(
                                                'absolute inset-0 bg-primary/10 rounded-md z-0 transition-all duration-500',
                                                selectedOption === index
                                                    ? 'bg-primary/20'
                                                    : ''
                                            )}
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Total Votes */}
                    <p className="text-sm text-muted-foreground mt-4">
                        {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t flex items-center justify-between px-4 py-2">
                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 px-2 py-1 rounded-md transition-colors">
                    <BarChart2 size={16} />
                    <span>Results</span>
                </button>

                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 px-2 py-1 rounded-md transition-colors">
                    <Share2 size={16} />
                    <span>Share</span>
                </button>
            </div>
        </div>
    );
};

export default PollCard;
