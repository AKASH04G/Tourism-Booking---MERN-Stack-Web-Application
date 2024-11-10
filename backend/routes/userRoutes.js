const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = require('../routes/auth'); // Import the auth middleware

// Function to generate JWT token
const generateToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Example login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate and send token
        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phoneNumber, address, dateOfBirth } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const user = new User({ name, email, password, phoneNumber, address, dateOfBirth });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user profile (protected route)
router.get('/profile', auth, async (req, res) => { // Apply auth middleware here
    try {
        const user = await User.findById(req.user._id); // Assuming `req.user` is set by auth middleware
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user profile (protected route)
router.put('/profile', auth, async (req, res) => { // Apply auth middleware here
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        console.error('Fetching user details error:', error.message);
        res.status(500).json({ message: 'Failed to fetch user details.' });
    }
});
module.exports = router;
