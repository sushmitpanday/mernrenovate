const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        // Agar .env file use kar rahe ho toh process.env.MONGO_URI use hoga
        const conn = await mongoose.connect(
            process.env.MONGO_URI || "mongodb://127.0.0.1:27017/silverbricks"
        );
        console.log(`🌐 MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1); // Server ko band kar do agar DB connect na ho
    }
};

module.exports = connectDB;