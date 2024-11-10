const express = require('express');
const router = express.Router();
const HotelRoom = require('../models/Hotel'); // Adjust the path to your model

// Route to get all hotels
router.get('/', async (req, res) => {
    try {
        const hotels = await HotelRoom.find();
        res.json(hotels);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get a specific hotel by ID
router.get('/hotels/:id', async (req, res) => {
    try {
        const hotel = await HotelRoom.findById(req.params.id);
        if (hotel) {
            res.json(hotel);
        } else {
            res.status(404).json({ message: 'Hotel not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get hotels in a specific city
router.get('/city/:city', async (req, res) => {
    try {
        const hotels = await HotelRoom.find({ city: req.params.city });
        if (hotels.length > 0) {
            res.json(hotels);
        } else {
            res.status(404).json({ message: 'No hotels found in this city' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get details of a specific hotel in a specific city
router.get('/city/:city/hotels/:hotelId', async (req, res) => {
    try {
        const cityHotels = await HotelRoom.findOne({ city: req.params.city });
        if (!cityHotels) return res.status(404).json({ message: 'City not found' });

        const hotel = cityHotels.rooms.id(req.params.hotelId);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

        res.json(hotel);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to add a new city with hotels
router.post('/', async (req, res) => {
    try {
        const { city, hotels } = req.body;
        if (!city || !Array.isArray(hotels)) return res.status(400).json({ message: 'Invalid input' });

        // Check if city already exists
        const existingCity = await HotelRoom.findOne({ city });
        if (existingCity) return res.status(400).json({ message: 'City already exists' });

        const newHotelRoom = new HotelRoom({ city, hotels });
        await newHotelRoom.save();
        res.status(201).json(newHotelRoom);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to add a new hotel to a city
router.post('/city/:city/hotels', async (req, res) => {
    try {
        const hotelData = req.body;
        const city = await HotelRoom.findOne({ city: req.params.city });
        if (!city) return res.status(404).json({ message: 'City not found' });

        city.rooms.push(hotelData);
        const updatedCity = await city.save();
        res.status(201).json(updatedCity.rooms[updatedCity.rooms.length - 1]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to update a hotel in a specific city
router.put('/city/:city/hotels/:hotelId', async (req, res) => {
    try {
        const city = await HotelRoom.findOne({ city: req.params.city });
        if (!city) return res.status(404).json({ message: 'City not found' });

        const hotel = city.rooms.id(req.params.hotelId);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

        Object.assign(hotel, req.body);
        const updatedCity = await city.save();
        res.json(updatedCity.rooms.id(req.params.hotelId));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to delete a hotel in a specific city
router.delete('/city/:city/hotels/:hotelId', async (req, res) => {
    try {
        const city = await HotelRoom.findOne({ city: req.params.city });
        if (!city) return res.status(404).json({ message: 'City not found' });

        const hotel = city.rooms.id(req.params.hotelId);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

        hotel.remove();
        const updatedCity = await city.save();
        res.json({ message: 'Hotel deleted', rooms: updatedCity.rooms });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
