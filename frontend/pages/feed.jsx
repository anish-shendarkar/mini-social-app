import {
    Container,
    Box,
} from "@mui/material";

import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import CreatePostCard from "../components/CreatePostCard";

import PostCard from "../components/Postcard";

import api from "../services/api";

export default function Feed() {
    const [posts, setPosts] =
        useState([]);

    const getPosts = async () => {
        const res = await api.get(
            "/api/posts"
        );

        setPosts(res.data);
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            <Navbar />

            <Container
                maxWidth="sm"
                sx={{ mt: 3 }}
            >
                <CreatePostCard
                    refresh={getPosts}
                />

                <Box mt={2}>
                    {posts.map((post) => (
                        <PostCard
                            key={post._id}
                            post={post}
                            refresh={getPosts}
                        />
                    ))}
                </Box>
            </Container>
        </>
    );
}
