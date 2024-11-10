// src/components/TourDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './TourDetails.css';

const TourDetails = () => {
    const { id } = useParams();
    // Example tour data
    const tour = {
        id: id,
        name: 'Beach Paradise',
        price: '$1000',
        description: 'Enjoy a relaxing beach vacation with all-inclusive amenities.',
        images: ['https://via.placeholder.com/600x400?text=Beach+Paradise']
    };

    return (
        <section className="tour-details">
            <div className="container">
                <h2>{tour.name}</h2>
                <p>{tour.description}</p>
                <p>Price: {tour.price}</p>
                <div className="images">
                    {tour.images.map((image, index) => (
                        <img src={image} alt={tour.name} key={index} />
                    ))}
                </div>
                <button className="book-now">Book Now</button>
            </div>
        </section>
    );
};

export default TourDetails;
