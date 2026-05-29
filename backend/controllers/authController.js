const User = require("../models/User");
const jwt = require("jsonwebtoken");
const twilio = require("twilio");

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const serviceSid = process.env.TWILIO_SERVICE_SID;

const sendOTP = async(req, res) => {
    try {
        const { phone } = req.body;
        const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

        // Verify API se OTP bhejna
        await client.verify.v2.services(serviceSid).verifications.create({
            to: formattedPhone,
            channel: 'sms'
        });

        return res.status(200).json({ success: true, message: "OTP sent" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const verifyOTP = async(req, res) => {
    try {
        const { phone, otp } = req.body;
        const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

        // Verify API se check karna
        const check = await client.verify.v2.services(serviceSid).verificationChecks.create({
            to: formattedPhone,
            code: otp
        });

        if (check.status !== 'approved') return res.status(400).json({ success: false, message: "Invalid OTP" });

        let user = await User.findOne({ phone });
        if (!user) user = await User.create({ phone, isVerified: true });
        else { user.isVerified = true;
            await user.save(); }

        const token = jwt.sign({ userId: user._id, role: user.role || 'customer' }, process.env.JWT_SECRET);
        return res.status(200).json({ success: true, token, role: user.role, isNewUser: !user.name });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Verification failed" });
    }
};

const completeOnboarding = async(req, res) => {
    try {
        const { name, email, role } = req.body;
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        user.name = name;
        user.email = email;
        user.role = role;
        await user.save();
        res.status(200).json({ success: true, role: user.role });
    } catch (error) { res.status(500).json({ message: "Error" }); }
};

module.exports = { sendOTP, verifyOTP, completeOnboarding };