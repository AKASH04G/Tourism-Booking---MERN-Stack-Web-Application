import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BusBookingConfirmation.css';

const BusBookingConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [passengerName, setPassengerName] = useState('');
    const [passengerEmail, setPassengerEmail] = useState('');
    const [passengerPhone, setPassengerPhone] = useState('');
    const [numOfSeats, setNumOfSeats] = useState(1);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { busDetails, selectedClass, totalPrice } = location.state || {};

    // Log the details to confirm their structure
    useEffect(() => {
        console.log('Bus Details:', busDetails);
        console.log('Selected Class:', selectedClass);
        console.log('Class Details:', busDetails?.classes?.[selectedClass]);
    }, [busDetails, selectedClass]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:5000/api/bookings/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    busId: busDetails?.id,
                    from: busDetails?.from,
                    to: busDetails?.to,
                    departureDate: busDetails?.departure,
                    arrivalDate: busDetails?.arrival,
                    class: selectedClass,
                    passengers: {
                        adults: numOfSeats,
                        children: 0
                    },
                    totalAmount: totalPrice
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to confirm booking');
            }

            const result = await response.json();
            setConfirmationMessage('Booking confirmed! Your ticket details will be sent to your email.');
            setTimeout(() => navigate('/my-orders'), 2000); // Navigate to MyOrders after 2 seconds
        } catch (err) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    // Check for class details before rendering
    const classDetails = busDetails?.classes?.[selectedClass] || {};

    return (
        <div className="booking-confirmation-container">
            <h2>Booking Confirmation</h2>
            {busDetails && classDetails ? (
                <div className="bus-details">
                    <h3>Bus Information</h3>
                    <p><strong>Bus Name:</strong> {busDetails.name || 'N/A'}</p>
                    <p><strong>From:</strong> {busDetails.from || 'N/A'}</p>
                    <p><strong>To:</strong> {busDetails.to || 'N/A'}</p>
                    <p><strong>Departure:</strong> {busDetails.departure ? new Date(busDetails.departure).toLocaleString() : 'N/A'}</p>
                    <p><strong>Arrival:</strong> {busDetails.arrival ? new Date(busDetails.arrival).toLocaleString() : 'N/A'}</p>
                    <p><strong>Duration:</strong> {busDetails.duration || 'N/A'}</p>
                    <h4>Class Information</h4>
                    <p>
                        <strong>{selectedClass || 'Class Information'}:</strong> 
                        Price: ₹{classDetails.price || 'N/A'} - 
                        Available Seats: {classDetails.availableSeats || 'N/A'}
                    </p>
                    <h4>Total Price: ₹{totalPrice || 'N/A'}</h4>
                </div>
            ) : (
                <p>Loading or invalid bus details.</p>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={passengerName}
                        onChange={(e) => setPassengerName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={passengerEmail}
                        onChange={(e) => setPassengerEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input
                        type="tel"
                        value={passengerPhone}
                        onChange={(e) => setPassengerPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Number of Seats:</label>
                    <input
                        type="number"
                        value={numOfSeats}
                        onChange={(e) => setNumOfSeats(e.target.value)}
                        min="1"
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Confirm Booking'}
                </button>
            </form>
            {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default BusBookingConfirmation;
