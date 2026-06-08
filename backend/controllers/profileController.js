const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) =>
    jwt.sign({ id: userId }, process.env.JWT_SECRET || 'SECRET', { expiresIn: '7d' });

exports.completeProfile = async(req, res) => {
    try {
        const { email, name, phone, location, role, specialization, businessName, teamSize } = req.body;
        const documentPath = req.file ? req.file.path : null;

        const updatedUser = await User.findOneAndUpdate({ email }, {
            name,
            phone,
            location,
            role,
            specialization,
            businessName,
            teamSize,
            documentPath,
            isProfileCompleted: true
        }, { new: true });

        const token = generateToken(updatedUser._id);
        res.status(200).json({ success: true, user: updatedUser, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};