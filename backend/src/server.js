require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth.route");
const postRoutes = require("./routes/posts.route");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://mini-social-app-dun.vercel.app",
        ],
        credentials: true,
    })
)

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");

        app.listen(process.env.PORT, () => {
            console.log(`Server running on ${process.env.PORT}`);
        });
    });