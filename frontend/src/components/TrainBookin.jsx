import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrainBooking.css';
import Loader from './Loader'; // Custom loader component

const availableCities = [
    "Chennai", "Bangalore", "Mumbai", "Pune", "Delhi", "Hyderabad", "Goa", "Kolkata", "Lucknow", "Patna", "Trivandrum", "Mysore", "Mangalore"
];

const TrainBooking = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [passengers, setPassengers] = useState(1);
    const [trains, setTrains] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState('price');
    const [classFilter, setClassFilter] = useState('All');
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://journeytime-backend.onrender.com/api/train-bookings/trains?from=${from}&to=${to}&date=${date}&classFilter=${classFilter}`);
            const contentType = response.headers.get('content-type');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                throw new Error('Expected JSON but got: ' + text);
            }

            const data = await response.json();
            // Sort trains based on the selected option
            const sortedTrains = data.sort((a, b) => {
                if (sortOption === 'price') {
                    const aPrice = a.classes[Object.keys(a.classes)[0]].price;
                    const bPrice = b.classes[Object.keys(b.classes)[0]].price;
                    return aPrice - bPrice;
                } else {
                    return a.duration.localeCompare(b.duration);
                }
            });
            setTrains(sortedTrains);
        } catch (err) {
            setError('Failed to fetch trains: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = (train, className) => {
        navigate('/bookingconfirmation', { state: { trainDetails: train, selectedClass: className } });
    };

    return (
        <div className="train-booking-container">
            <div className="search-section">
                <h2>Search Trains</h2>
                <form onSubmit={handleSearch}>
                    <div className="form-group">
                        <label>From:</label>
                        <select value={from} onChange={(e) => setFrom(e.target.value)} required>
                            <option value="">Select City</option>
                            {availableCities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>To:</label>
                        <select value={to} onChange={(e) => setTo(e.target.value)} required>
                            <option value="">Select City</option>
                            {availableCities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Date:</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Passengers:</label>
                        <input type="number" value={passengers} onChange={(e) => setPassengers(e.target.value)} min="1" required />
                    </div>
                    <div className="form-group">
                        <label>Sort by:</label>
                        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                            <option value="price">Price</option>
                            <option value="duration">Duration</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Filter by Class:</label>
                        <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Sleeper">Sleeper</option>
                            <option value="AC">AC</option>
                            <option value="FirstClass">First Class</option>
                        </select>
                    </div>
                    <button type="submit">Search Trains</button>
                </form>
            </div>

            <div className="results-section">
                {loading && <Loader />}
                {error && <p className="error">{error}</p>}
                {!loading && !error && trains.length > 0 && (
                    <div className="train-results">
                        <h3>Available Trains</h3>
                        <ul>
                            {trains.map(train => (
                                <li key={train._id}>
                                    <strong>{train.name}</strong><br />
                                    From: {train.from} <br />
                                    To: {train.to} <br />
                                    Departure: {train.departure}<br />
                                    Arrival: {train.arrival}<br />
                                    Duration: {train.duration}<br />
                                    <div className="train-details">
                                        {Object.entries(train.classes).map(([className, details]) => (
                                            <div key={className} className="class-details">
                                                <h4>{className} Class</h4>
                                                <p>Price: ₹{details.price}</p>
                                                <p>Available Seats: {details.availableSeats}</p>
                                                <button onClick={() => handleBooking(train, className)}>Book Now</button>
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {!loading && !error && trains.length === 0 && <p>No trains found matching the criteria.</p>}
            </div>
        </div>
    );
};

export default TrainBooking;
