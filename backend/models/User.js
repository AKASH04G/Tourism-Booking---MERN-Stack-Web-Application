// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    dateOfBirth: {
        type: Date
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    dateJoined: {
        type: Date,
        default: Date.now
    },
    profilePicture: {
        type: String,
        trim: true
    },
    preferences: {
        type: Object
    },
    bookingHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking' // Assuming you have a Booking model
    }]
});

// Hash the password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
