// Updated PackageDetails component
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PackageDetails.css';
import CityCountryBoxes from './CityCountryBoxes';
import CityPackages from './CityPackages';

const PackageDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { package: pkg } = location.state;
    const [selectedCity, setSelectedCity] = useState(null);
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        adultsMale: 0,
        adultsFemale: 0,
        children: 0,
        specialRequests: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookingRef = `BOOK${Math.floor(1000000 + Math.random() * 9000000)}`;
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('https://journeytime-backend.onrender.com/api/packageBookings/book', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    packageId: pkg._id,
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    adultsMale: formData.adultsMale,
                    adultsFemale: formData.adultsFemale,
                    children: formData.children,
                    specialRequests: formData.specialRequests,
                    bookingRef
                })
            });

            if (response.ok) {
                const data = await response.json();
                setSuccess('Booking confirmed!');
                navigate('/my-orders');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to book package.');
            }
        } catch (error) {
            console.error('Booking error:', error);
            setError('An error occurred during booking.');
        }
    };

    return (
        <div className="package-details-page">
            <h1>{pkg.name}</h1>
            <img src={pkg.image} alt={pkg.name} className="package-detail-image" />
            <div className="package-info">
                <h2>Price: {pkg.price}</h2>
                <h3>Stays: {pkg.stays}</h3>
                <p><strong>Description:</strong> {pkg.description}</p>
                <p><strong>Details:</strong> {pkg.info}</p>
                <p><strong>Specialties:</strong> {pkg.specialties}</p>
                <div className="rating">
                    {[...Array(5)].map((star, i) => (
                        <span key={i} className={`star ${pkg.starRating > i ? 'filled' : ''}`}>★</span>
                    ))}
                    <span className="rating-value">({pkg.starRating})</span>
                </div>
                <div className="package-rules">
                    <h3>Rules & Regulations:</h3>
                    <ul>
                        <li>All bookings must be confirmed at least 14 days in advance.</li>
                        <li>Cancellation within 7 days of departure will incur a 50% charge.</li>
                        <li>Valid ID is required upon check-in.</li>
                        <li>Additional charges may apply for extra services.</li>
                    </ul>
                </div>
                <form className="booking-form" onSubmit={handleSubmit}>
                    <h3>Book This Package</h3>
                    <label>
                        Start Date:
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        End Date:
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Number of Adults:
                        <input
                            type="number"
                            name="adultsMale"
                            value={formData.adultsMale}
                            onChange={handleChange}
                            min="0"
                            placeholder="Male"
                        />
                        <input
                            type="number"
                            name="adultsFemale"
                            value={formData.adultsFemale}
                            onChange={handleChange}
                            min="0"
                            placeholder="Female"
                        />
                    </label>
                    <label>
                        Number of Children:
                        <input
                            type="number"
                            name="children"
                            value={formData.children}
                            onChange={handleChange}
                            min="0"
                        />
                    </label>
                    <label>
                        Special Requests:
                        <textarea
                            name="specialRequests"
                            value={formData.specialRequests}
                            onChange={handleChange}
                            placeholder="Any special requests or needs?"
                        />
                    </label>
                    <button type="submit">Proceed to Payment</button>
                </form>

                {success && <p className="success-message">{success}</p>}
                {error && <p className="error-message">{error}</p>}
            </div>
            <h2>Explore Other Tours Below</h2>
            <CityCountryBoxes onCitySelect={(cityName) => setSelectedCity(cityName)} />
            {selectedCity ? (
                <CityPackages cityName={selectedCity} />
            ) : (
                <p>Select a city to explore more packages.</p>
            )}
        </div>
    );
};

export default PackageDetails;

