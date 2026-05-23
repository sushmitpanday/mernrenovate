const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// CORS: Sabhi origins allow kiye hain
app.use(cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-rtb-fingerprint-id"],
    exposedHeaders: ["x-rtb-fingerprint-id"]
}));

app.use(express.json());

// Database Connection
connectDB();

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("SilverBricks Connect API is running...");
});

// 🚀 Render ke liye: Ye hamesha chalega
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});