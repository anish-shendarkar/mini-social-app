const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const Post = require("../models/Post");
const upload = require("../config/multer");

// Create Post
router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    async (req, res) => {
        try {
            const { text } = req.body;

            const image = req.file
                ? `/uploads/${req.file.filename}`
                : "";

            if (!text && !image) {
                return res.status(400).json({
                    message:
                        "Post must contain text or image",
                });
            }

            const post = await Post.create({
                user: req.user.id,
                username: req.user.username,
                text,
                image,
            });

            res.status(201).json(post);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }
);

// Get Feed
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 });

        const formattedPosts = posts.map(
            (post) => ({
                _id: post._id,

                username: post.username,

                text: post.text,

                image: post.image,

                likesCount: post.likes.length,

                commentsCount:
                    post.comments.length,

                likes: post.likes,

                comments: post.comments,

                createdAt: post.createdAt,
            })
        );

        res.json(formattedPosts);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

// Like Post
router.put(
    "/:id/like",
    authMiddleware,
    async (req, res) => {
        try {
            const post = await Post.findById(
                req.params.id
            );

            if (!post) {
                return res.status(404).json({
                    message: "Post not found",
                });
            }

            const alreadyLiked =
                post.likes.find(
                    (like) =>
                        like.userId === req.user.id
                );

            if (alreadyLiked) {
                post.likes =
                    post.likes.filter(
                        (like) =>
                            like.userId !== req.user.id
                    );
            } else {
                post.likes.push({
                    userId: req.user.id,
                    username: req.user.username,
                });
            }

            await post.save();

            res.json({
                likesCount: post.likes.length,
                likedUsers: post.likes,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }
);

// Comment Post
router.post(
    "/:id/comment",
    authMiddleware,
    async (req, res) => {
        try {
            const { text } = req.body;

            if (!text) {
                return res.status(400).json({
                    message: "Comment required",
                });
            }

            const post = await Post.findById(
                req.params.id
            );

            if (!post) {
                return res.status(404).json({
                    message: "Post not found",
                });
            }

            post.comments.push({
                username: req.user.username,
                text,
            });

            await post.save();

            res.json({
                commentsCount:
                    post.comments.length,
                comments: post.comments,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }
);

module.exports = router;