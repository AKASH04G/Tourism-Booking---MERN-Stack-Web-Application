import {useState,useEffect,React} from 'react';
import { useNavigate } from 'react-router-dom';
import './TrendingTours.css';

const TrendingTours = ({ onSelectTour }) => {
    const navigate = useNavigate();

    const tours = [
        { name: 'Golden Triangle Tour', image: '../images/GoldenTriangleTour.jpeg', price: '$500'
        },
        { name: 'Kerala Backwaters', image: '../images/keralaBackwater.jpg', price: '$300'
        },
        { name: 'Goa Beaches', image: '../images/GoaBeaches.jpg', price: '$400'
        },
        { name: 'Rajasthan Desert Safari', image: '/images/Rajasthan.webp', price: '$450'
        },
        { name: 'Himalayan Adventure', image: '/images/Himalayan.jpeg', price: '$600'
        },
        { name: 'Andaman Islands', image: '/images/andaman.webp', price: '$700'
        },
        { name: 'South India Temple Tour', image: '/images/southIndia.jpg', price: '$350'
        },
        { name: 'Northeast India Exploration', image: '/images/northeast.jpg', price: '$550'
        },
    ];

    const handleTourClick = (tour) => {
        onSelectTour(tour);  // Set selected tour
        navigate('/Trendingtourdetails');
    };

    return (
        <section className="trending-tours">
            <div className="container">
                <h2>Trending Tours</h2>
                <div className="boxes" id="tour-scrollable">
                    {tours.map((tour, index) => (
                        <div className="tour-card" key={index} onClick={() => handleTourClick(tour)}>
                            <img src={tour.image} alt={tour.name} />
                            <h3>{tour.name}</h3>
                            <p>{tour.price}</p>
                            <button className="details-button">View Details</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingTours;
