import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const pollSchema = new Schema(
    {
        question: {
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
        totalVotes: {
            type: Number,
            default: 0,
        },
        options: [
            {
                text: {
                    type: String,
                    required: true,
                },
                votes: {
                    type: Number,
                    default: 0,
                },
            },
        ],
    },
    { timestamps: true }
);

pollSchema.plugin(mongooseAggregatePaginate);

export const User = mongoose.model("Poll", pollSchema);
