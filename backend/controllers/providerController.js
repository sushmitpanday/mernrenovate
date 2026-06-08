const Provider = require('../models/provider');
const User = require('../models/User');

exports.registerProvider = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const { teamMembers, ...rest } = req.body;
        const payload = {
            ...rest,
            userId: req.user.id,
            email: user.email,
        };

        if (teamMembers) {
            payload.teamMembers = typeof teamMembers === 'string'
                ? JSON.parse(teamMembers)
                : teamMembers;
        }

        const provider = await Provider.findOneAndUpdate(
            { userId: req.user.id },
            payload,
            { new: true, upsert: true, runValidators: true }
        );

        res.status(201).json({
            message: 'Registration Successful',
            providerId: provider._id,
            provider,
        });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ error: 'Server Error during registration' });
    }
};

exports.getMyProviderProfile = async (req, res) => {
    try {
        const provider = await Provider.findOne({ userId: req.user.id });
        if (!provider) {
            return res.status(404).json({ message: 'No provider profile found' });
        }
        res.status(200).json(provider);
    } catch (error) {
        console.error('My Profile Fetch Error:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.getProviderProfile = async (req, res) => {
    try {
        const providerId = req.params.id;

        if (!providerId || providerId === 'undefined' || providerId === 'null') {
            return res.status(400).json({ message: 'Invalid Provider ID' });
        }

        const provider = await Provider.findById(providerId);
        if (!provider) {
            return res.status(404).json({ message: 'Provider not found' });
        }

        if (provider.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.status(200).json(provider);
    } catch (error) {
        console.error('Profile Fetch Error:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};
