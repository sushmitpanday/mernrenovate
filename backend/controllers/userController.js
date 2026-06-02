const User = require('../models/User');

exports.completeProfile = async(req, res) => {
    try {
        const { email, name, role } = req.body;

        const updatedUser = await User.findOneAndUpdate({ email }, { name, role, isProfileCompleted: true }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};