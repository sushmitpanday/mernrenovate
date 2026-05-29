const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, unique: true, sparse: true },
    password: { type: String }, // Kuch user direct login ke liye use kar sakte hain
    phone: { type: String, unique: true, sparse: true },

    // 🛠️ Role Selection State (Tum Kaun Ho Logic)
    role: {
        type: String,
        enum: ["customer", "tradie", "business_owner", "admin"],
        default: "customer"
    },

    isVerified: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpExpires: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);