const User = require('../models/User');
const OTP = require('../models/otp');
const { sendOTPEmail } = require('../utils/emailService');

exports.sendOTP = async(req, res) => {
    try {
        const { email } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // आपका मौजूदा लॉजिक: इसमें कोई छेड़छाड़ नहीं की गई है
        await OTP.findOneAndUpdate({ email }, { otp, expiresAt: new Date(Date.now() + 5 * 60 * 1000) }, { upsert: true, new: true });

        // ईमेल भेजने के लिए timeout का इस्तेमाल ताकि सर्वर पेंडिंग में न रहे
        const emailPromise = sendOTPEmail(email, otp);
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Email service timed out")), 8000)
        );

        await Promise.race([emailPromise, timeoutPromise]);

        res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        console.error("OTP Error:", error); // रेंडर के लॉग्स में चेक करने के लिए
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