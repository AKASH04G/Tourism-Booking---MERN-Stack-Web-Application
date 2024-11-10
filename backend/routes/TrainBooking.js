const express = require('express');
const router = express.Router();
const Train = require('../models/Train');
const TrainBooking = require('../models/TrainBooking');
const User = require('../models/User');
const auth = require('./auth'); // Updated path
require('dotenv').config();

// Fetch trains based on search criteria
router.get('/trains', async (req, res) => {
    try {
        const { from, to, date, classFilter } = req.query;
        let query = {
            from: { $regex: from, $options: 'i' },
            to: { $regex: to, $options: 'i' },
        };
        let trains = await Train.find(query);

        if (classFilter && classFilter !== 'All') {
            trains = trains.filter(train => train.classes[classFilter]);
        }
        
        res.json(trains);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new booking
router.post('/book', auth, async (req, res) => {
    const { trainId, className, passengers } = req.body;

    try {
        const userId = req.user._id;
        const train = await Train.findById(trainId);

        if (!train) {
            return res.status(404).json({ message: 'Train not found' });
        }

        const classDetails = train.classes[className];
        if (!classDetails || classDetails.availableSeats < passengers) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        const totalPrice = classDetails.price * passengers;
        const booking = new TrainBooking({
            user: userId,
            train: trainId,
            className,
            passengers,
            totalPrice
        });

        await booking.save();

        train.classes[className].availableSeats -= passengers;
        await train.save();

        await User.findByIdAndUpdate(userId, { $push: { bookingHistory: booking._id } });

        res.status(201).json(booking);
    } catch (error) {
        console.error('Booking error:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
});


// Get all bookings for a user
router.get('/my-bookings', auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const bookings = await TrainBooking.find({ user: userId }).populate('train');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
