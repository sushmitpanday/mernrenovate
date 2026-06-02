require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const connectDB = require("./config/db");
const personalDocRoutes = require("./routes/personaldocument");
const updateProfileRoutes = require("./routes/profileRoutes");

const app = express();

// 1. Uploads folder auto-creation (File upload safety)
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// 2. Middleware
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-rtb-fingerprint-id"],

}));

app.use(express.json());

// 3. Database Connection
connectDB();

// 4. Routes & Static Files
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);
app.use("/api/profile", personalDocRoutes);
app.use("/api/update", updateProfileRoutes);
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
    res.send("SilverBricks Connect API is running...");
});

// 5. Global Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
});

// 6. Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});