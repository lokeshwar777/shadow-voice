import React, { useState } from 'react';
import UserAvatar from '../../components/ui/UserAvatar';
import { BarChart2, Share2, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '../../lib/utils';

const PollCard = ({ poll }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [pollData, setPollData] = useState(poll.options);

    const handleVote = (optionId) => {
        if (hasVoted) return;

        setSelectedOption(optionId);
        setHasVoted(true);

        setPollData((prev) =>
            prev.map((option) =>
                option.id === optionId
                    ? { ...option, votes: option.votes + 1 }
                    : option
            )
        );
    };

    const totalVotes = pollData.reduce((sum, option) => sum + option.votes, 0);
    const timeAgo = formatDistanceToNow(new Date(poll.createdAt), { addSuffix: true });

    const pollEndsText = poll.expiresAt
        ? formatDistanceToNow(new Date(poll.expiresAt), { addSuffix: true })
        : null;

    return (
        <div className="bg-card border rounded-lg overflow-hidden transition-all duration-300 card-hover animate-fadeIn">
            <div className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <UserAvatar user={poll.author || null} isAnonymous={poll.isAnonymous} />
                        <div>
                            <h3 className="font-medium text-card-foreground">
                                {poll.isAnonymous ? 'Anonymous' : poll.author?.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">{timeAgo}</p>
                        </div>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground rounded-full p-1 transition-colors">
                        <MoreHorizontal size={18} />
                    </button>
                </div>

                <div className="mt-3 mb-4">
                    <h4 className="text-lg font-medium mb-4">{poll.question}</h4>

                    <div className="space-y-3">
                        {pollData.map((option) => {
                            const percentage = totalVotes > 0
                                ? Math.round((option.votes / totalVotes) * 100)
                                : 0;

                            return (
                                <div key={option.id} className="relative">
                                    <button
                                        onClick={() => handleVote(option.id)}
                                        disabled={hasVoted}
                                        className={cn(
                                            "w-full text-left p-3 rounded-md border transition-all relative z-10",
                                            hasVoted
                                                ? "cursor-default"
                                                : "hover:border-primary hover:bg-primary/5 cursor-pointer",
                                            selectedOption === option.id && "border-primary bg-primary/5"
                                        )}
                                    >
                                        <div className="flex justify-between">
                                            <span>{option.text}</span>
                                            {hasVoted && <span className="font-medium">{percentage}%</span>}
                                        </div>
                                    </button>

                                    {hasVoted && (
                                        <div
                                            className={cn(
                                                "absolute inset-0 bg-primary/10 rounded-md z-0 transition-all duration-500",
                                                selectedOption === option.id ? "bg-primary/20" : ""
                                            )}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {pollEndsText && (
                        <p className="text-xs text-muted-foreground mt-4">
                            Poll ends {pollEndsText}
                        </p>
                    )}

                    <p className="text-sm text-muted-foreground mt-4">
                        {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
                    </p>
                </div>
            </div>

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
