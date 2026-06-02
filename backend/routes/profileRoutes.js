const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // Multer middleware
const { completeProfile } = require('../controllers/profileController');

router.post('/complete-profile', upload.single('documents'), completeProfile);

module.exports = router;