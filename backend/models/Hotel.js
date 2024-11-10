const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  type: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  description: { type: String, required: true },
  amenities: [String],
  availableRooms: { type: Number, required: true },
  image: { type: String },
  dateAvailableFrom: { type: Date, required: true },
  dateAvailableTo: { type: Date, required: true }
});

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  image: { type: String },
  rooms: [roomSchema]
});

module.exports = mongoose.model('HotelRoom', hotelSchema);
