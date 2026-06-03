// utils/emailService.js
const axios = require('axios');

const sendOTPEmail = async(toEmail, otp) => {
    const url = 'https://api.brevo.com/v3/smtp/email';

    const data = {
        sender: { email: 'pandaysushmitpanday@gmail.com', name: 'Sushmit Pandey' },
        to: [{ email: toEmail }],
        subject: 'OTP Verification',
        textContent: `आपका OTP है: ${otp}`
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'api-key': process.env.BREVO_API_KEY,
                'content-type': 'application/json'
            }
        });
        return { success: true, response: response.data };
    } catch (error) {
        // यहाँ हमने Optional Chaining (?.) हटा दी है और इसे सुरक्षित कर दिया है
        const errorMessage = (error.response && error.response.data) ? error.response.data : error.message;
        console.error("Brevo API Error:", errorMessage);
        throw error;
    }
};

module.exports = { sendOTPEmail };