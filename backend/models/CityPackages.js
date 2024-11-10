const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    stays: { type: String, required: true },
    description: { type: String, required: true },
    info: { type: String, required: true },
    starRating: { type: Number, required: true },
    specialties: { type: String, required: true },
    image: { type: String, required: true }
});

const citySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    packages: [packageSchema]
});

const CityPackages = mongoose.model('CityPackages', citySchema);
module.exports = CityPackages;
