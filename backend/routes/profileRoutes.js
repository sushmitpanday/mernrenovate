const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // Multer middleware
const { completeProfile } = require('../controllers/profileController');

router.post('/complete-profile', upload.single('documents'), completeProfile);

module.exports = router;