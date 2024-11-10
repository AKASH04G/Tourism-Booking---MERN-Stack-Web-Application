const mongoose = require('mongoose');

const hotelBookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    numberOfPersons: { type: Number, required: true },
    price: { type: Number, required: true },
    hotelName: { type: String, required: true },
    roomDetails: {
        type: {
            type: { type: String, required: true },
            pricePerNight: { type: Number, required: true },
            description: { type: String, required: true },
            amenities: [String],
            availableRooms: { type: Number, required: true },
            image: { type: String },
            dateAvailableFrom: { type: Date, required: true },
            dateAvailableTo: { type: Date, required: true }
        }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HotelBooking', hotelBookingSchema);
