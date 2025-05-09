import { Poll } from '../models/poll.model.js';

export const getPolls = async (req, res) => {
    try {
        const polls = await Poll.find()
            .populate('author', 'name username')
            .lean()
            .sort({ createdAt: -1 });

        const formattedPolls = polls.map((poll) => ({
            ...poll,
            author: poll.isAnonymous ? 'Anonymous' : poll.author,
        }));

        res.status(200).json(formattedPolls);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPollById = async (req, res) => {
    const { id: pollId } = req.params;
    // console.log('get by id', req);
    try {
        const poll = await Poll.findById(pollId)
            .populate('author', 'name username')
            .lean();
        if (!poll) {
            return res
                .status(404)
                .json({ success: false, message: 'poll not found' });
        }

        // Replace `null` authors with "Anonymous"
        const formattedPoll = {
            ...poll,
            author: poll.isAnonymous ? 'Anonymous' : poll.author,
        };

        res.status(200).json(formattedPoll);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createPoll = async (req, res) => {
    try {
        const { question, options, isAnonymous } = req.body;
        // console.log(question, options, isAnonymous);
        if (!question || !options || options.length < 2) {
            return res.status(400).json({
                message:
                    'A poll must have a question and at least two options.',
            });
        }

        const poll = Poll.create({
            question,
            options: options.map((text) => ({ text })),
            author: !isAnonymous ? req.user : null,
            isAnonymous,
        });

        const savedPoll = await Poll.populate('author', 'name username');
        if (!savedPoll) {
            return res
                .status(400)
                .json({ success: false, message: 'failed to create poll' });
        }

        res.status(201).json(savedPoll);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const votePoll = async (req, res) => {
    try {
        const { optionIndex } = req.body;
        const poll = await Poll.findById(req.params.id);
        if (!poll) return res.status(404).json({ message: 'Poll not found' });

        if (optionIndex < 0 || optionIndex >= poll.options.length) {
            return res.status(400).json({ message: 'Invalid option selected' });
        }
        // Check if the user has already voted
        const voter = poll.voters.find(
            (voter) => voter.User?.toString() === req.user.id
        );
        if (voter) {
            // User has already voted, update their vote
            const previousOptionIndex = voter.option;

            if (previousOptionIndex === optionIndex) {
                return res
                    .status(400)
                    .json({ message: 'You have already voted for this option' });
            }
            // Decrement vote count for the previous option
            if (typeof previousOptionIndex === 'number' && previousOptionIndex >= 0 && previousOptionIndex < poll.options.length) {
                poll.options[previousOptionIndex].votes -= 1;
            }

            // Update the voter's selected option
            voter.option = optionIndex;
        } else {
            // User has not voted yet, add their vote
            poll.voters.push({ User: req.user.id, option: optionIndex });
        }

        // Increment vote count for the new option
        poll.options[optionIndex].votes += 1;

        // Update total votes
        poll.totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);

        await poll.save();

        res.status(200).json({ message: 'Vote recorded', poll });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePoll = async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.id);
        if (!poll) return res.status(404).json({ message: 'Poll not found' });

        if (poll.author && poll.author.toString() !== req.user.id) {
            return res
                .status(403)
                .json({ message: 'Not authorized to delete this poll' });
        }

        await poll.deleteOne();
        res.status(200).json({ message: 'Poll deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
