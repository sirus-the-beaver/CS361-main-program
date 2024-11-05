const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
    const { email } = req.query;

    try {
        const user = await User.findOne({ email });
        res.status(200).json(user.preferences);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.put('/', async (req, res) => {
    const { preferences, email } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log(user);
        user.preferences = preferences;
        await user.save();

        res.status(200).json({ message: "Preferences updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;