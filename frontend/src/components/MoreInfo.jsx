// src/components/MoreInfo.js
import React from 'react';
import './MoreInfo.css';

const MoreInfo = () => {
    return (
        <section className="more-info">
            <div className="container">
                <h2>More About India</h2>
                <div className="info-content">
                    <p>Discover more about India's diverse culture, history, and travel tips. Explore our guides and recommendations for an enriched travel experience.</p>
                    <a href="#" className="btn">Learn More</a>
                </div>
            </div>
        </section>
    );
};

export default MoreInfo;
