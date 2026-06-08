const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    email: { type: String, required: true },
    firstName: String,
    middleName: String,
    lastName: String,
    mobile1: String,
    mobile2: String,
    serviceArea: String,
    serviceTitle: String,
    description: String,
    teamMembers: [{ name: String, role: String }],
    status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Provider', providerSchema);