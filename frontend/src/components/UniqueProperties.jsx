// src/components/UniqueProperties.js
import {useEffect,useState,React} from 'react';
import GenericCard from './GenericCard';
import './UniqueProperties.css';

 

const UniqueProperties = () => {
    const uniquePropertiesData = [
        { 
            title: 'Houseboat in Kerala', 
            image: ' /images/kerala.jpg', 
            description: 'Stay on a luxurious houseboat in Kerala.'
        },
        { 
            title: 'Treehouse in Himachal', 
            image: '/images/Himalayan.jpeg', 
            description: 'Experience nature in a treehouse in Himachal.'
        },
        { 
            title: 'Palace in Rajasthan', 
            image: ' /images/Rajasthan.webp',
             description: 'Live like royalty in a palace in Rajasthan.'
        }
    ];
    return (
        <section className="unique-properties">
            <div className="container">
                <h2>Unique Properties</h2>
                <div className="card-container">
                    {uniquePropertiesData.map((property, index) => (
                        <GenericCard
                            key={index}
                            image={property.image}
                            title={property.title}
                            description={property.description}
                            buttonLabel="View Details"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UniqueProperties;
