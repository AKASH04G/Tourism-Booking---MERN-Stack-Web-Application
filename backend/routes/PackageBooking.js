const express = require('express');
const router = express.Router();
const PackageBooking = require('../models/PackageBooking');
const auth = require('../routes/auth'); // Middleware for authentication

// Create a new package booking
router.post('/book', auth, async (req, res) => {
    try {
        const {
            packageId,
            startDate,
            endDate,
            adultsMale,
            adultsFemale,
            children,
            specialRequests,
            bookingRef
        } = req.body;

        // Ensure bookingRef is unique
        const existingBooking = await PackageBooking.findOne({ bookingRef });
        if (existingBooking) {
            return res.status(400).json({ message: 'Booking reference already exists.' });
        }

        // Create a new booking
        const booking = new PackageBooking({
            packageId,
            startDate,
            endDate,
            adultsMale,
            adultsFemale,
            children,
            specialRequests,
            bookingRef,
            user: req.user._id // Attach the user who made the booking
        });

        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        console.error('Booking error:', error.message);
        res.status(500).json({ message: 'Failed to create booking.', error: error.message });
    }
});

// Get all bookings for a user
router.get('/my-bookings', auth, async (req, res) => {
    try {
        const bookings = await PackageBooking.find({ user: req.user._id }).populate('packageId');
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Fetching bookings error:', error.message);
        res.status(500).json({ message: 'Failed to fetch bookings.', error: error.message });
    }
});

module.exports = router;
