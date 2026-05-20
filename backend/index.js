const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// CORS: Sabhi origins allow kiye hain
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
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

// 🚀 Vercel aur Local dono ke liye logic
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Local Server running on port ${PORT}`);
    });
}

// Vercel ke liye export
module.exports = app;