const User = require('../models/User');

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

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};