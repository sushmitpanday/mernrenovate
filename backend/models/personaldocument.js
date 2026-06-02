const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['tradie', 'business_owner'], required: true },

    // Basic Details
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    experience: { type: String },

    // Business Owner के लिए Extra Fields
    businessName: { type: String },
    teamSize: { type: Number },
    teamExpertise: { type: String },
    officeAddress: { type: String },

    // Documents
    documents: [{ type: String }]
});

module.exports = mongoose.model('Profile', profileSchema);