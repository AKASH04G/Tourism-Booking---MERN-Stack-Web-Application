// src/components/Slideshow.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Slideshow.css';

const Slideshow = ({ handleExploreClick }) => {
    const slides = [
        {
            type: 'image',
            src: ' https://images.pexels.com/photos/17328712/pexels-photo-17328712/free-photo-of-aerial-view-of-houses-around-the-dal-lake-in-jammu-and-kashmir-india.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Replace with your video URL
            quote: 'Experience the thrill of exploration.',
        },
        {
            type: 'image',
            src: '../images/tajmahal.jpg',
            quote: 'Adventure awaits you in the mountains.',
        },
        {
            type: 'image',
            src: 'https://images.pexels.com/photos/6738438/pexels-photo-6738438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            quote: 'Discover the beauty of the wilderness.',
        },
       
        {
            type: 'image',
            src: 'https://wallpaperaccess.com/full/629876.jpg',
            quote: 'Find peace in the serenity of nature.',
        },
        {
            type: 'image',
            src: 'https://wallpaperaccess.com/full/1431673.jpg',
            quote: 'Your journey begins here.',
        }
    ];

    return (
        <div className="slideshow-container">
            <Carousel 
                showArrows={true} 
                autoPlay={true} 
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                interval={3000} 
            >
                {slides.map((slide, index) => (
                    <div key={index} className="hero-slide">
                        {slide.type === 'image' ? (
                            <img src={slide.src} alt={`Slide ${index + 1}`} />
                        ) : (
                            <video src={slide.src} autoPlay loop muted />
                        )}
                        <div className="overlay-content">
                            <div className="hero-content">
                                <h1>Welcome to journeyTime</h1>
                                <p className="title">Your gateway to amazing travel experiences in India.</p>
                                <button onClick={handleExploreClick}>Explore India</button>
                            </div>
                            <div className="quote-container">
                                <p className="quote">{slide.quote}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Slideshow;
