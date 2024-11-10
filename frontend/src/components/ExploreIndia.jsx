// src/components/ExploreIndia.js
import React, { useState, useEffect } from 'react';
import GenericCard from './GenericCard';
import './ExploreIndia.css';

const ExploreIndia = () => {
    const exploreIndiaData = [
        { title: 'Agra', image: '/images/agra.jpg', description: 'Explore the royal heritage of Agra.'
        },
        { title: 'Kerala', image: '/images/kerala.jpg', description: 'Experience the serene backwaters of Kerala.'
        },
        { title: 'Himalayas', image: '/images/Himalayan.jpeg', description: 'Discover the beautiful hills of the Himalayas.'
        }
    ];

    return (
        <section className="explore-india">
            <div className="container">
                <h2>Explore India</h2>
                <div className="card-container">
                    {exploreIndiaData.map((place, index) => (
                        <GenericCard
                            key={index}
                            image={place.image}
                            title={place.title}
                            description={place.description}
                            buttonLabel="View Details"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExploreIndia;
