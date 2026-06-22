const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    text: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const likeSchema = new mongoose.Schema({
    userId: String,
    username: String,
});

const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        username: {
            type: String,
            required: true,
        },

        text: {
            type: String,
            default: "",
        },

        image: {
            type: String,
            default: "",
        },

        likes: [likeSchema],

        comments: [commentSchema],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", postSchema);
