import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        isAnonymous: {
            type: Boolean,
            default: false,
        },
        postId: {
            type: [Schema.Types.ObjectId],
            ref: "Post",
        },
    },
    { timestamps: true }
);

commentSchema.plugin(mongooseAggregatePaginate);

export const User = mongoose.model("Comment", commentSchema);
