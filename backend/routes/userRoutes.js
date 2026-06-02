const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // Multer middleware import kiya
const { sendOTP, verifyOTP } = require('../controllers/authController');
const { completeProfile } = require('../controllers/profileController'); // Profile controller import kiya

// Routes
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

// Ye route ab /api/complete-profile par work karega
router.post('/complete-profile', upload.single('documents'), completeProfile);

module.exports = router;