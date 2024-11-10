import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BusBooking.css';

const availableCities = [
    "Chennai",
    "Bangalore",
    "Mumbai",
    "Pune",
    "Delhi",
    "Hyderabad",
    "Goa",
    "Kolkata",
    "Lucknow",
    "Patna",
    "Trivandrum",
    "Mysore",
    "Mangalore"
];

const BusBooking = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [passengers, setPassengers] = useState(1);
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/buses'); // Update with your backend API URL
            if (!response.ok) {
                throw new Error('Failed to fetch buses');
            }

            const data = await response.json();
            console.log('API Data:', data);

            if (data && Array.isArray(data)) {
                const filteredBuses = data.filter(
                    bus => bus.from.toLowerCase() === from.toLowerCase() && bus.to.toLowerCase() === to.toLowerCase()
                );

                console.log('Filtered Buses:', filteredBuses);

                setBuses(filteredBuses);
            } else {
                throw new Error('Invalid data structure');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = (bus, className) => {
        // Calculate total price based on selected class and number of passengers
        const totalPrice = passengers * bus.classes[className].price;

        // Navigate to the BookingConfirmation component
        navigate('/busbookingconfirmation', { state: { busDetails: bus, selectedClass: className, totalPrice } });
    };

    return (
        <div className="bus-booking-container">
            <div className="search-section">
                <h2>Search Buses</h2>
                <form onSubmit={handleSearch}>
                    <div className="form-group">
                        <label>From:</label>
                        <select 
                            value={from} 
                            onChange={(e) => setFrom(e.target.value)} 
                            required
                        >
                            <option value="">Select City</option>
                            {availableCities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>To:</label>
                        <select 
                            value={to} 
                            onChange={(e) => setTo(e.target.value)} 
                            required
                        >
                            <option value="">Select City</option>
                            {availableCities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Date:</label>
                        <input 
                            type="date" 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Passengers:</label>
                        <input 
                            type="number" 
                            value={passengers} 
                            onChange={(e) => setPassengers(e.target.value)} 
                            min="1" 
                            required 
                        />
                    </div>
                    <button type="submit">Search Buses</button>
                </form>
            </div>

            <div className="results-section">
                {loading && <p>Loading buses...</p>}

                {error && <p className="error">{error}</p>}

                {!loading && !error && buses.length > 0 && (
                    <div className="bus-results">
                        <h3>Available Buses</h3>
                        <ul>
                            {buses.map(bus => (
                                <li key={bus.id}>
                                    <strong>{bus.name}</strong><br />
                                    From: {bus.from} <br />
                                    To: {bus.to} <br />
                                    Departure: {bus.departure}<br />
                                    Arrival: {bus.arrival}<br />
                                    Duration: {bus.duration}<br />
                                    <div className="bus-details">
                                        {Object.entries(bus.classes).map(([className, details]) => (
                                            <div key={className} className="class-details">
                                                <strong>{className}</strong><br />
                                                Price: ₹{details.price}<br />
                                                Available Seats: {details.availableSeats}<br />
                                                <button
                                                    onClick={() => handleBooking(bus, className)}
                                                    className="book-now-button"
                                                >
                                                    Book {className} - ₹{details.price}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {!loading && !error && buses.length === 0 && (
                    <div className="no-results">
                        <p>No buses available for the selected route.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BusBooking;
