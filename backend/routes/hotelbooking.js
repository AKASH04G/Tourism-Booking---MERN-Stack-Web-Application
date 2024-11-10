const express = require('express');
const router = express.Router();
const HotelBooking = require('../models/HotelBooking');
const auth = require('./auth'); // Ensure this path is correct

// Create a new booking
router.post('/book', auth, async (req, res) => {
    const { userId, userName, numberOfPersons, price, hotelName, roomDetails } = req.body;

    if (!userId || !userName || !numberOfPersons || !price || !hotelName || !roomDetails ||
        !roomDetails.type || !roomDetails.pricePerNight || !roomDetails.description ||
        !roomDetails.availableRooms || !roomDetails.image || !roomDetails.dateAvailableFrom ||
        !roomDetails.dateAvailableTo) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const booking = new HotelBooking({
            userId,
            userName,
            numberOfPersons,
            price,
            hotelName,
            roomDetails: {
                type: roomDetails.type,
                pricePerNight: roomDetails.pricePerNight,
                description: roomDetails.description,
                amenities: roomDetails.amenities || [],
                availableRooms: roomDetails.availableRooms,
                image: roomDetails.image,
                dateAvailableFrom: new Date(roomDetails.dateAvailableFrom),
                dateAvailableTo: new Date(roomDetails.dateAvailableTo)
            }
        });

        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        console.error('Booking error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get bookings for the authenticated user
router.get('/bookings', auth, async (req, res) => {
    try {
        const bookings = await HotelBooking.find({ userId: req.user._id });
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
