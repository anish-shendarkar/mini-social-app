import { useState } from "react";

import {
    Card,
    CardContent,
    TextField,
    Button,
    Stack,
} from "@mui/material";

import api from "../services/api";

export default function CreatePostCard({
    refresh,
}) {
    const [text, setText] =
        useState("");

    const [image, setImage] =
        useState(null);

    const handleSubmit = async () => {
        try {
            const formData =
                new FormData();

            formData.append("text", text);

            if (image) {
                formData.append(
                    "image",
                    image
                );
            }

            await api.post(
                "/posts",
                formData
            );

            setText("");
            setImage(null);

            refresh();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <TextField
                        multiline
                        rows={3}
                        placeholder="What's on your mind?"
                        value={text}
                        onChange={(e) =>
                            setText(
                                e.target.value
                            )
                        }
                    />

                    <Button
                        variant="outlined"
                        component="label"
                    >
                        Upload Image

                        <input
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setImage(
                                    e.target.files[0]
                                )
                            }
                        />
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Post
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}
