const express = require('express');
const router = express.Router();
const Train = require('../models/Train');
require('dotenv').config();

// POST route to add multiple train data
router.post('/add-train', async (req, res) => {
    const trainsData = req.body;

    try {
        if (!Array.isArray(trainsData)) {
            return res.status(400).send('Invalid input: expected an array of train objects');
        }

        const trains = await Train.insertMany(trainsData);
        res.status(201).send(trains);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET route to fetch all trains
router.get('/all-trains', async (req, res) => {
    try {
        const trains = await Train.find({});
        res.send(trains);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
