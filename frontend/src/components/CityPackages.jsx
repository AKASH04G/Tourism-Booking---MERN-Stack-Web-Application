import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CityPackages.css';
import CityCountryBoxes from './CityCountryBoxes';
import Loader from './Loader';

const CityPackages = () => {
    const { cityName } = useParams();
    const navigate = useNavigate(); // Hook to programmatically navigate
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (cityName) {
            fetch(`http://localhost:5000/api/cities/${cityName}`)
                .then(response => response.json())
                .then(data => {
                    setPackages(data.packages); // Ensure this matches your API response
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        }
    }, [cityName]);

    if (loading) return <p> <Loader/></p>;
    if (error) return <p>Error loading packages: {error.message}</p>;

    const handleBookNowClick = (pkg) => {
        navigate('/package-details', { state: { package: pkg } });
    };

    return (
        <div className="city-packages">
            <h1>Tour Packages for {cityName}</h1>
            <div className="packages-list">
                {packages.map((pkg, index) => (
                    <div className="package-card" key={index}>
                        <img src={pkg.image} alt={pkg.name} className="package-image" />
                        <div className="package-details">
                            <h2>{pkg.name}</h2>
                            <p><strong>Price:</strong> {pkg.price}</p>
                            <p><strong>Stays:</strong> {pkg.stays}</p>
                            <p><strong>Description:</strong> {pkg.description}</p>
                            <p><strong>Info:</strong> {pkg.info}</p>
                            <div className="rating">
                                {[...Array(5)].map((star, i) => (
                                    <span key={i} className={`star ${pkg.starRating > i ? 'filled' : ''}`}>★</span>
                                ))}
                                <span className="rating-value">({pkg.starRating})</span>
                            </div>
                            <p><strong>Specialties:</strong> {pkg.specialties}</p>
                            <button className="book-now-button" onClick={() => handleBookNowClick(pkg)}>
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <CityCountryBoxes onCitySelect={(cityName) => navigate(`/city-packages/${cityName}`)} />
        </div>
    );
};

export default CityPackages;
