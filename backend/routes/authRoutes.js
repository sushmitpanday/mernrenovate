const express = require("express");
const router = express.Router();
const { sendOTP, verifyOTP, completeOnboarding } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/complete-onboarding", protect, completeOnboarding);

module.exports = router;