import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CityCountryBoxes.css';

const CityCountryBoxes = ({ onCitySelect }) => {
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/cities/')
            .then(response => response.json())
            .then(data => setCities(data)) // Adjust according to the actual response
            .catch(error => console.error('Error fetching city data:', error));
    }, []);

    const handleCityClick = (cityName) => {
        onCitySelect(cityName);
        navigate(`/city-packages/${cityName}`);
    };

    return (
        <section className="city-country-boxes">
            <div className="container">
                <h2>Cities in India</h2>
                <div className="boxes" id="scrollable">
                    {cities.map((city, index) => (
                        <div className="box" key={index} onClick={() => handleCityClick(city.name)}>
                            <img src={city.image} alt={city.name} />
                            <h2>{city.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CityCountryBoxes;
