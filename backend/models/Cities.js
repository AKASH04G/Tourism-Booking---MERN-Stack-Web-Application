const mongoose = require('mongoose');

// Define schema for tour packages
 
// Define schema for cities
const citySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
     
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Create the model
const City = mongoose.model('City', citySchema);

// Export the model
module.exports = City;
