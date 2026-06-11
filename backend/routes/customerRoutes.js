const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { createJob, getMyJobs, getMatchingProviders, getAllJobs } = require('../controllers/customerController');
router.post('/create', auth, createJob);
router.get('/my-jobs', auth, getMyJobs);
router.get('/matching-providers', auth, getMatchingProviders);
router.get("/jobs", auth, getAllJobs);
module.exports = router;