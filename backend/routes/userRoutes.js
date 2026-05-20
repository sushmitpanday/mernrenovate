// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/userController'); // controller file name ke hisab se
const { protect } = require('../middlewares/authMiddleware'); // middleware file name ke hisab se

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;