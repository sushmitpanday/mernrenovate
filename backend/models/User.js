const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Basic Details (Sabke liye)
    email: { type: String, required: true, unique: true },
    name: { type: String },
    phone: { type: String },
    location: { type: String },
    role: { type: String, enum: ['customer', 'tradie', 'owner'], default: 'customer' },
    isProfileCompleted: { type: Boolean, default: false },

    // Professional Details (Conditional)
    // Tradie ke liye
    specialization: { type: String },

    // Business Owner ke liye
    businessName: { type: String },
    teamSize: { type: String },

    // Documents (Dono ke liye)
    documentPath: { type: String },

    // Timestamp
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);