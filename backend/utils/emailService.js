// utils/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // service: 'gmail' की जगह यह बेहतर है
    port: 587, // 587 पोर्ट रेंडर के लिए बेस्ट है
    secure: false, // 587 के लिए false जरूरी है
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // रेंडर के लिए यह लाइन जादुई है
    }
});

const sendOTPEmail = async(toEmail, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'OTP Verification',
        text: `आपका OTP है: ${otp}`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return { success: true, info };
    } catch (error) {
        console.error("Nodemailer Error:", error);
        throw error;
    }
};

module.exports = { sendOTPEmail };