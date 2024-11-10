const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    price: { type: Number, required: true },
    availableSeats: { type: Number, required: true }
});

const trainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    departure: {
        type: String,
        required: true
    },
    arrival: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    classes: {
        Sleeper: { type: classSchema, required: true },
        AC: { type: classSchema, required: true },
        FirstClass: { type: classSchema, required: true }
    }
});

const Train = mongoose.model('Train', trainSchema);
module.exports = Train;
