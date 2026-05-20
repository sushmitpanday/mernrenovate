const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db"); // 1. db.js import waise hi hai

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
connectDB(); // 2. Database connection call

// --- ROUTES SETUP ---
const userRoutes = require("./routes/userRoutes"); // Aapki file name ke mutabik
app.use("/api/users", userRoutes); // Ab aapke routes "/api/users/register" aur "/api/users/login" banenge

// Root Router Test ke liye
app.get("/", (req, res) => {
    res.send("SilverBricks Connect API is running...");
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});