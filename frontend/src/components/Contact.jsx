// src/components/Contact.js
import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle contact form submission
        console.log('Contact form data:', formData);
    };

    return (
        <section className="contact">
            <div className="container">
                <h2>Contact Us</h2>
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
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
