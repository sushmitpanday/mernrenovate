const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
    registerProvider,
    getMyProviderProfile,
    getProviderProfile,
} = require('../controllers/providerController');

router.post('/register', auth, registerProvider);
router.get('/me', auth, getMyProviderProfile);
router.get('/profile/:id', auth, getProviderProfile);

module.exports = router;
