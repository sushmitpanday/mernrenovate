const Job = require('../models/job');
const Provider = require('../models/provider');
exports.createJob = async(req, res) => {
    try {
        const { area, service, startDate, cleaningType, bedrooms, description, images } = req.body;

        // Validate required fields
        if (!area || !service || !startDate) {
            return res.status(400).json({ error: "Area, Service, and Start Date are required" });
        }
        const job = await Job.create({
            customerId: req.user.id,
            area,
            service,
            startDate,
            cleaningType,
            bedrooms,
            description,
            images,
            status: "Open"
        });
        res.status(201).json({ success: true, job });
    } catch (error) {
        console.error("Create Job Error:", error);
        res.status(500).json({ error: error.message });
    }
};
exports.getMyJobs = async(req, res) => {
    try {
        const jobs = await Job.find({ customerId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Fetch Jobs Error:", error);
        res.status(500).json({ error: error.message });
    }
};


exports.getMatchingProviders = async(req, res) => {
    try {
        const jobs = await Job.find({ customerId: req.user.id }).sort({ createdAt: -1 });

        if (!jobs.length) return res.json([]);

        const latestJob = jobs[0];

        let providers = await Provider.find();

        res.json(providers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllJobs = async(req, res) => {
    try {
        const jobs = await Job.find({ status: "Open" })
            .sort({ createdAt: -1 });

        res.status(200).json(jobs);
    } catch (error) {
        console.error("Get Jobs Error:", error);
        res.status(500).json({ error: error.message });
    }
};