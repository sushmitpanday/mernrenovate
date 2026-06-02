const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/personaldocument');
const authMiddleware = require('../middlewares/personalmiddleware');

router.post('/update', authMiddleware, updateProfile);
module.exports = router;