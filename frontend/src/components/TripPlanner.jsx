// src/components/TripPlanner.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TripPlanner.css';

const TripPlanner = () => {
    const navigate = useNavigate();

    const handleConsultationClick = () => {
        navigate('/consultation-form');
    };

    return (
        <section className="trip-planner">
            <div className="trip-planner-content">
                <h4 className='aa'>Plan Your Dream Trip</h4>
                <p>Our team of experts is here to help you plan the perfect vacation tailored to your preferences. Whether you're looking for a relaxing beach getaway, an adventurous mountain trek, or a cultural city tour, we've got you covered.</p>
                <p>Fill out our consultation form and let us take care of the rest. We offer personalized planning services to ensure your trip is everything you've dreamed of and more.</p>
                <button className="btn" onClick={handleConsultationClick}>Book a Consultation</button>
            </div>
        </section> 
    );
};

export default TripPlanner;
