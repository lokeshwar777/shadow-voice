import mongoose, { Schema } from 'mongoose';
// import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const postSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        isAnonymous: {
            type: Boolean,
            default: false,
        },
        likes: {
            type: [Schema.Types.ObjectId], // Array of user IDs so users cannot like multiple times
            ref: 'User',
            default: [],
        },
        comments: {
            type: [Schema.Types.ObjectId],
            ref: 'Comment',
            default: [],
        },
    },
    { timestamps: true }
);

// postSchema.plugin(mongooseAggregatePaginate);

export const Post = mongoose.model('Post', postSchema);
