import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import api from "../services/api";

export default function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post(
                "/auth/signup",
                form
            );

            navigate("/login");
        } catch (error) {
            alert(
                error.response?.data?.message
            );
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper
                sx={{
                    mt: 10,
                    p: 4,
                }}
            >
                <Typography
                    variant="h4"
                    textAlign="center"
                    mb={3}
                >
                    Signup
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Username"
                        name="username"
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        name="email"
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        type="password"
                        label="Password"
                        name="password"
                        onChange={handleChange}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{ mt: 2 }}
                    >
                        Signup
                    </Button>
                </Box>

                <Typography mt={2}>
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </Typography>
            </Paper>
        </Container>
    );
}
