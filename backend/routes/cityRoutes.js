const express = require('express');
const router = express.Router();
const City = require('../models/Cities'); // Adjust the path to where your City model is defined

// Route to get all cities
router.get('/ ', async (req, res) => {
    try {
        const cities = await City.find();
        res.json(cities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get a specific city by ID
router.get('/:id', async (req, res) => {
    try {
        const city = await City.findById(req.params.id);
        if (city) {
            res.json(city);
        } else {
            res.status(404).json({ message: 'City not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to create new cities
router.post('/cities', async (req, res) => {
    const citiesData = req.body;

    // Validate the array
    if (!Array.isArray(citiesData) || citiesData.length === 0) {
        return res.status(400).json({ message: 'Invalid data: must be a non-empty array' });
    }

    // Validate each city object
    for (const cityData of citiesData) {
        if (!cityData.name || !cityData.image) {
            return res.status(400).json({ message: 'Name and image are required for each city' });
        }
    }

    try {
        // Insert multiple cities
        const cities = await City.insertMany(citiesData);
        res.status(201).json(cities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
