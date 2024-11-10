// models/Bus.js
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    price: { type: Number, required: true },
    availableSeats: { type: Number, required: true }
}, { _id: false });

const busSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    departure: { type: Date, required: true },
    arrival: { type: Date, required: true },
    duration: { type: String, required: true },
    classes: { type: Map, of: classSchema }
});

module.exports = mongoose.model('Bus', busSchema);
