import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const postSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        isAnonymous: {
            type: Boolean,
            default: false,
        },
        likes: {
            type: Number,
            default: 0,
        },
        comments: {
            type: [Schema.Types.ObjectId],
            ref: 'Comment',
            default: [],
        },
    },
    { timestamps: true }
);

postSchema.plugin(mongooseAggregatePaginate);

export const User = mongoose.model('Post', postSchema);
