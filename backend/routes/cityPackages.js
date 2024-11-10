const express = require('express');
const router = express.Router();
const CityPackages = require('../models/CityPackages');

// Get all cities
router.get('/', async (req, res) => {
    try {
        const cities = await CityPackages.find();
        res.json(cities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific city by name
router.get('/:name', async (req, res) => {
    try {
        const city = await CityPackages.findOne({ name: req.params.name });
        if (!city) return res.status(404).json({ message: 'City not found' });
        res.json(city);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new city
router.post('/bulk', async (req, res) => {
    try {
        const cities = req.body;
        const newCities = await CityPackages.insertMany(cities);
        res.status(201).json(newCities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
