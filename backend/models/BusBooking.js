// models/BusBooking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingId: { type: String, required: true, unique: true },
    busId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    departureDate: { type: Date, required: true },
    arrivalDate: { type: Date, required: true },
    class: { type: String, required: true },
    passengers: { 
        adults: { type: Number, required: true },
        children: { type: Number, default: 0 }
    },
    totalAmount: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['Booked', 'Cancelled', 'Completed'], 
        default: 'Booked' 
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BusBooking', bookingSchema);
