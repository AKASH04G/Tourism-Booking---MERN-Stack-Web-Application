// models/TrainBooking.js
const mongoose = require('mongoose');

const trainBookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    train: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Train',
        required: true
    },
    className: {
        type: String,
        enum: ['Sleeper', 'AC', 'FirstClass'],
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    passengers: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Booked', 'Cancelled', 'Completed'],
        default: 'Booked'
    }
});

const TrainBooking = mongoose.model('TrainBooking', trainBookingSchema);
module.exports = TrainBooking;
