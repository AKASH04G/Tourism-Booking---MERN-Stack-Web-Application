const express = require('express');
const router = express.Router();
const Booking = require('../models/BusBooking');
const Bus = require('../models/Buses');
const auth = require('./auth'); // Ensure auth middleware is in place

// Get all bookings
router.get('/', auth, async (req, res) => {
    try {
        const bookings = await Booking.find().populate('userId');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a booking by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('userId');
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new booking
router.post('/', auth, async (req, res) => {
    const { busId, from, to, departureDate, arrivalDate, class: busClass, passengers, totalAmount } = req.body;
    const userId = req.user.id;

    try {
        // Check for missing fields
        if (!busId || !from || !to || !departureDate || !arrivalDate || !busClass || !passengers || !totalAmount) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Find the bus
        const bus = await Bus.findOne({ id: busId });
        if (!bus) return res.status(404).json({ message: 'Bus not found' });

        // Check class availability
        const busClassDetails = bus.classes.get(busClass);
        if (!busClassDetails || busClassDetails.availableSeats < (passengers.adults + passengers.children)) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        // Create a new booking
        const booking = new Booking({
            bookingId: `BK${Date.now()}`, // Example bookingId
            busId,
            userId,
            from,
            to,
            departureDate,
            arrivalDate,
            class: busClass,
            passengers,
            totalAmount,
            status: 'Booked'
        });

        // Save the booking
        const newBooking = await booking.save();

        // Update bus availability
        busClassDetails.availableSeats -= (passengers.adults + passengers.children);
        bus.classes.set(busClass, busClassDetails);
        await bus.save();

        res.status(201).json(newBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a booking by ID
router.put('/:id', auth, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        if (booking.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.json(updatedBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a booking by ID
router.delete('/:id', auth, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        if (booking.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Booking deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
