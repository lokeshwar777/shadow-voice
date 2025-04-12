import mongoose, { Schema } from 'mongoose';

const pollSchema = new Schema(
    {
        question: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: null,
            index: true,
        },
        isAnonymous: {
            type: Boolean,
            default: false,
        },
        totalVotes: {
            type: Number,
            default: 0,
            index: true,
        },
        options: [
            {
                index: {
                    type: Number,
                    required: true,
                    index: true,
                    unique: true,
                },
                text: {
                    type: String,
                    required: true,
                    trim: true,
                },
                votes: {
                    type: Number,
                    default: 0,
                },
            },
        ],
        voters: [
            {
                User: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
                option: {
                    type: Number,
                },
            },

        ],
    },
    { timestamps: true }
);

pollSchema.pre('save', function (next) {
    if (this.options.length < 2) {
        return next(new Error('A poll must have at least two options.'));
    }
    next();
});

pollSchema.pre('save', function (next) {
    const optionTexts = new Set(
        this.options.map((opt) => opt.text.toLowerCase())
    );
    if (optionTexts.size !== this.options.length) {
        return next(new Error('Poll options must be unique.'));
    }
    next();
});

export const Poll = mongoose.model('Poll', pollSchema);
