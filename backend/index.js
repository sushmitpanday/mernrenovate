const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// --- 🛠️ CHANGED: Puraane app.use(cors()) ko hata kar yeh lagayein ---
// Isse aapka Vercel frontend aur Render backend aapas me sahi se baat kar payenge
app.use(cors({
    origin: ["https://mernrenovate-wd66.vercel.app", "http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

// --- DATABASE CONNECTION ---
connectDB();

// --- ROUTES SETUP ---
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Root Router Test ke liye
app.get("/", (req, res) => {
    res.send("SilverBricks Connect API is running...");
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});