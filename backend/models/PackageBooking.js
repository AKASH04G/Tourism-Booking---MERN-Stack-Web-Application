const mongoose = require('mongoose');

const packageBookingSchema = new mongoose.Schema({
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'CityPackages', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    adultsMale: { type: Number, default: 0 },
    adultsFemale: { type: Number, default: 0 },
    children: { type: Number, default: 0 },
    specialRequests: { type: String, default: '' },
    bookingRef: { type: String, unique: true, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('PackageBooking', packageBookingSchema);
