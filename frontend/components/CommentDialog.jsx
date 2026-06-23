import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Typography,
    Stack,
} from "@mui/material";

import { useState } from "react";

import api from "../services/api";

export default function CommentDialog({
    open,
    onClose,
    post,
    refresh,
}) {
    const [comment, setComment] =
        useState("");

    const handleComment =
        async () => {
            try {
                await api.post(
                    `/api/posts/${post._id}/comment`,
                    {
                        text: comment,
                    }
                );

                setComment("");

                refresh();

                onClose();
            } catch (error) {
                console.log(error);
            }
        };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
        >
            <DialogTitle>
                Comments
            </DialogTitle>

            <DialogContent>
                <Stack spacing={2}>
                    {post.comments.map(
                        (comment, index) => (
                            <div key={index}>
                                <Typography
                                    fontWeight="bold"
                                >
                                    {
                                        comment.username
                                    }
                                </Typography>

                                <Typography>
                                    {comment.text}
                                </Typography>
                            </div>
                        )
                    )}

                    <TextField
                        label="Write comment"
                        value={comment}
                        onChange={(e) =>
                            setComment(
                                e.target.value
                            )
                        }
                    />

                    <Button
                        variant="contained"
                        onClick={handleComment}
                    >
                        Send
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}
