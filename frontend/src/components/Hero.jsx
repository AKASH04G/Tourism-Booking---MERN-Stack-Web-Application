import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Slideshow from './Slideshow';
import './Hero.css';
import ExploreIndia from './ExploreIndia';
import TripPlanner from './TripPlanner';
import UniqueProperties from './UniqueProperties';
import MoreInfo from './MoreInfo';
import Offers from './Offers';
import TrendingTours from './TrendingTours';
import CityCountryBoxes from './CityCountryBoxes';
import CityPackages from './CityPackages';
  
const Hero = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    const cityCountryRef = useRef(null);
    const navigate = useNavigate();

    const handleExploreClick = () => {
        cityCountryRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleCitySelection = (cityName) => {
        setSelectedCity(cityName);
        navigate(`/city-packages/${cityName}`);
    };

    return (
        <>
            <section className="hero">
                <Slideshow handleExploreClick={handleExploreClick} />
            </section>
            <div ref={cityCountryRef}>
                <CityCountryBoxes onCitySelect={handleCitySelection} />
            </div>
            {selectedCity && <CityPackages cityName={selectedCity} />}
            <TrendingTours />
            <ExploreIndia />
            <TripPlanner />
            <UniqueProperties />
            <MoreInfo />
            <Offers />
             
        </>
    );
};

export default Hero;
