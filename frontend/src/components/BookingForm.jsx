// src/components/BookingForm.js
import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', date: '', tour: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Booking data:', formData);
    };

    return (
        <section className="booking-form">
            <div className="container">
                <h2>Book Your Tour</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="tour"
                        value={formData.tour}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Tour</option>
                        <option value="beach-paradise">Beach Paradise</option>
                        <option value="mountain-adventure">Mountain Adventure</option>
                        <option value="city-exploration">City Exploration</option>
                    </select>
                    <button type="submit">Book Now</button>
                </form>
            </div>
        </section>
    );
};

export default BookingForm;
