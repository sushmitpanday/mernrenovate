const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    area: { type: String, required: true },
    service: { type: String, required: true },
    title: String, // Job title

    images: [String],
    startDate: { type: String, required: true },
    cleaningType: { type: String },
    bedrooms: { type: String },
    status: {
        type: String,
        default: "Open"
    },
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Job', jobSchema);