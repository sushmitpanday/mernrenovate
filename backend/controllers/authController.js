const User = require('../models/User');
const OTP = require('../models/OTP');
const { sendOTPEmail } = require('../utils/emailService');

exports.sendOTP = async(req, res) => {
    try {
        const { email } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await OTP.findOneAndUpdate({ email }, { otp, expiresAt: new Date(Date.now() + 5 * 60 * 1000) }, { upsert: true, new: true });
        await sendOTPEmail(email, otp);
        res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.verifyOTP = async(req, res) => {
    try {
        const { email, otp } = req.body;

        const otpRecord = await OTP.findOne({ email, otp });
        if (!otpRecord) return res.status(400).json({ success: false, message: "Invalid OTP" });
        if (new Date() > otpRecord.expiresAt) return res.status(400).json({ success: false, message: "OTP expired" });

        await OTP.deleteOne({ email });

        let user = await User.findOne({ email });

        // LOGIC FIX:
        // 1. Agar user exist hi nahi karta -> Naya user
        // 2. Agar user exist karta hai lekin isProfileCompleted true nahi hai -> Incomplete profile (Registration bhejो)
        if (!user || user.isProfileCompleted !== true) {
            if (!user) {
                user = await User.create({ email, isProfileCompleted: false });
            }
            return res.status(200).json({ success: true, isNewUser: true, message: "Complete profile" });
        }

        // Agar user exist karta hai aur profile complete hai
        return res.status(200).json({ success: true, isNewUser: false, user, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};