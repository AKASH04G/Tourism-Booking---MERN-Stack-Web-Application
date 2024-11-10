const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const auth = async (req, res, next) => {
    try {
        // Extract token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.error('Authorization header missing');
            return res.status(401).json({ message: 'No token provided' });
        }

        // Ensure token is in the format 'Bearer <token>'
        const token = authHeader.split(' ')[1];
        if (!token) {
            console.error('Token missing from Authorization header');
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.userId) {
            console.error('Invalid token payload');
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Fetch the user associated with the token
        const user = await User.findById(decoded.userId);
        if (!user) {
            console.error('User not found');
            return res.status(401).json({ message: 'User not found' });
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (error) {
        // Handle different types of errors
        if (error.name === 'JsonWebTokenError') {
            console.error('Invalid token:', error.message);
            return res.status(401).json({ message: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            console.error('Token expired:', error.message);
            return res.status(401).json({ message: 'Token expired' });
        } else {
            console.error('Authentication error:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = auth;
