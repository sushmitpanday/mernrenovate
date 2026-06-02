const Profile = require('../models/personaldocument');

exports.updateProfile = async(req, res) => {
    try {
        const updatedProfile = await Profile.findOneAndUpdate({ userId: req.user.id },
            req.body, { new: true, upsert: true }
        );
        res.status(200).json(updatedProfile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};