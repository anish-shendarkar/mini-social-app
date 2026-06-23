import {
    AppBar,
    Toolbar,
    Typography,
    Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();

        navigate("/login");
    };

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1 }}
                >
                    Social Feed
                </Typography>

                <Button
                    color="inherit"
                    onClick={logout}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}
