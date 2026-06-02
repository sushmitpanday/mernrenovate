// utils/emailService.js
const nodemailer = require('nodemailer');

// ट्रांसपोर्टर को बाहर रखें (यह बार-बार नहीं बनेगा)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // सुनिश्चित करें कि यहाँ 16 अंकों का App Password ही है
    }
});

const sendOTPEmail = async(toEmail, otp) => { // async जोड़ें
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
        console.error("Nodemailer Error:", error); // रेंडर लॉग्स में असली एरर यहाँ दिखेगा
        throw error;
    }
};

module.exports = { sendOTPEmail };