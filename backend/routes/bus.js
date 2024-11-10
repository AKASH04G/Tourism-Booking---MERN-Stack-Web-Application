// routes/busRoutes.js
const express = require('express');
const router = express.Router();
const Bus = require('../models/Buses');

// Get all buses
router.get('/', async (req, res) => {
    try {
        const buses = await Bus.find();
        res.json(buses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a bus by ID
router.get('/:id', async (req, res) => {
    try {
        const bus = await Bus.findOne({ id: req.params.id });
        if (!bus) return res.status(404).json({ message: 'Bus not found' });
        res.json(bus);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new buses
router.post('/', async (req, res) => {
    // Expecting an array of bus objects
    const buses = req.body;

    if (!Array.isArray(buses)) {
        return res.status(400).json({ message: 'Request body must be an array of buses' });
    }

    try {
        const newBuses = await Bus.insertMany(buses);
        res.status(201).json(newBuses);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a bus by ID
router.put('/:id', async (req, res) => {
    try {
        const bus = await Bus.findOneAndUpdate({ id: req.params.id }, req.body, { new: true, runValidators: true });
        if (!bus) return res.status(404).json({ message: 'Bus not found' });
        res.json(bus);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a bus by ID
router.delete('/:id', async (req, res) => {
    try {
        const bus = await Bus.findOneAndDelete({ id: req.params.id });
        if (!bus) return res.status(404).json({ message: 'Bus not found' });
        res.json({ message: 'Bus deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
