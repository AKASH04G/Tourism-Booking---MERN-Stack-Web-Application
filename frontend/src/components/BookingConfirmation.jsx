import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { trainDetails } = location.state || {};

    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        passengers: 1 // Add passengers field to the user details
    });
    const [pnr, setPnr] = useState('');

    // Assume the token is stored in localStorage
    const token = localStorage.getItem('token');
    console.log('Token:', token); 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Generate a random PNR number
        const generatedPnr = `PNR${Math.floor(100000000 + Math.random() * 900000000)}`;
        setPnr(generatedPnr);

        try {
            const response = await fetch('http://localhost:5000/api/train-bookings/book', {
                
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add the token to the headers
                },
                body: JSON.stringify({
                    trainId: trainDetails._id,
                    className: location.state.selectedClass, // Ensure this is set correctly
                    passengers: userDetails.passengers // Use the number of passengers from state
                })
            });

            if (!response.ok) {
                const textResponse = await response.text();
                throw new Error(textResponse || 'Failed to book train');
            }

            const data = await response.json();
            navigate('/my-orders');
            alert('Booking confirmed!');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    if (!trainDetails) {
        return <p>Error: No train details provided.</p>;
    }

    return (
        <div className="booking-confirmation-container">
            <h2>Booking Confirmation</h2>
            <p>Thank you for booking your ticket! Please fill in the details to get your ticket information.</p>
            <form onSubmit={handleSubmit} className="user-info-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={userDetails.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={userDetails.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Passengers:</label>
                    <input
                        type="number"
                        name="passengers"
                        value={userDetails.passengers}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>
                <button className='confirmBookingbtn' type="submit">Confirm Booking</button>
            </form>

            {pnr && (
                <div className="ticket-details">
                    <h3>Your Ticket Details</h3>
                    <p><strong>PNR Number:</strong> {pnr}</p>
                    <p><strong>Train:</strong> {trainDetails.name}</p>
                    <p><strong>From:</strong> {trainDetails.from}</p>
                    <p><strong>To:</strong> {trainDetails.to}</p>
                    <p><strong>Departure:</strong> {trainDetails.departure}</p>
                    <p><strong>Arrival:</strong> {trainDetails.arrival}</p>
                    <p><strong>Duration:</strong> {trainDetails.duration}</p>
                </div>
            )}
        </div>
    );
};

export default BookingConfirmation;
