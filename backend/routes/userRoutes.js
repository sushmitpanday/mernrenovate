const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // Multer middleware import kiya
const auth = require('../middlewares/auth');
const User = require('../models/User');
const { sendOTP, verifyOTP } = require('../controllers/authController');
const { completeProfile } = require('../controllers/profileController'); // Profile controller import kiya

// Routes
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

// Ye route ab /api/complete-profile par work karega
router.post('/complete-profile', upload.single('documents'), completeProfile);

// Get current user profile for authentication check
router.get('/auth/me', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;