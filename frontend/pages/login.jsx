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

import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [form, setForm] = useState({
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
            const res = await api.post(
                "/api/auth/login",
                form
            );

            login(
                res.data.token,
                res.data.user
            );

            navigate("/");
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
                    Login
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >
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
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </Box>

                <Typography mt={2}>
                    Don't have an account?{" "}
                    <Link to="/signup">
                        Signup
                    </Link>
                </Typography>
            </Paper>
        </Container>
    );
}
