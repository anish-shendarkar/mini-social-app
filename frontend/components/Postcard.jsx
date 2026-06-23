import { useState } from "react";

import {
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    CardActions,
    Typography,
    IconButton,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";

import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import api from "../services/api";

import CommentDialog from "./CommentDialog";

export default function PostCard({
    post,
    refresh,
}) {
    const [open, setOpen] =
        useState(false);

    const handleLike =
        async () => {
            try {
                await api.put(
                    `/api/posts/${post._id}/like`
                );

                refresh();
            } catch (error) {
                console.log(error);
            }
        };

    return (
        <>
            <Card sx={{ mb: 2 }}>
                <CardHeader
                    title={post.username}
                    subheader={new Date(
                        post.createdAt
                    ).toLocaleString()}
                />

                <CardContent>
                    {post.text && (
                        <Typography>
                            {post.text}
                        </Typography>
                    )}
                </CardContent>

                {post.image && (
                    <CardMedia
                        component="img"
                        height="300"
                        image={post.image}
                    />
                )}

                <CardActions>
                    <IconButton
                        onClick={handleLike}
                    >
                        <FavoriteIcon />
                    </IconButton>

                    <Typography>
                        {post.likesCount}
                    </Typography>

                    <IconButton
                        onClick={() =>
                            setOpen(true)
                        }
                    >
                        <ChatBubbleIcon />
                    </IconButton>

                    <Typography>
                        {post.commentsCount}
                    </Typography>
                </CardActions>
            </Card>

            <CommentDialog
                open={open}
                onClose={() =>
                    setOpen(false)
                }
                post={post}
                refresh={refresh}
            />
        </>
    );
}
