import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section about">
                        <h2>About Us</h2>
                        <p>
                            We are dedicated to providing the best travel experiences across India. 
                            Explore top tourist locations, plan your trips easily, and stay at unique properties.
                        </p>
                    </div>
                    <div className="footer-section links">
                        <h2>Quick Links</h2>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/explore-india">Explore India</a></li>
                            <li><a href="/trip-planner">Trip Planner</a></li>
                            <li><a href="/unique-properties">Unique Properties</a></li>
                            <li><a href="/offers">Offers</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="footer-section contact">
                        <h2>Contact Us</h2>
                        <p>
                            <i className="fas fa-map-marker-alt"></i> 123 Travel Street, Kovaipudur, Coimbatore, India
                        </p>
                        <p>
                            <i className="fas fa-phone"></i> +91 9543875124
                        </p>
                        <p>
                            <i className="fas fa-envelope"></i> support@tourbooking.com
                        </p>
                    </div>
                    <div className="footer-section social">
                        <h2>Follow Us</h2>
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <img src="https://th.bing.com/th?id=OIP.HaH0x68UIG3oTvky4afdewHaHa&w=249&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="Facebook" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <img src=" https://static.vecteezy.com/system/resources/previews/027/395/710/non_2x/twitter-brand-new-logo-3-d-with-new-x-shaped-graphic-of-the-world-s-most-popular-social-media-free-png.png" alt="Twitter" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <img src="https://th.bing.com/th/id/R.03f40b67b63d9c1c1a5a792109bbc699?rik=8HhXk%2b5PP7XurQ&riu=http%3a%2f%2fpngimg.com%2fuploads%2finstagram%2finstagram_PNG10.png&ehk=%2f7%2ftghrL31GFpelB7DZvprao8IZHRvmhi0BpDsEAZgI%3d&risl=&pid=ImgRaw&r=0" alt="Instagram" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <img src="https://pngimg.com/uploads/linkedIn/linkedIn_PNG8.png" alt="LinkedIn" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    &copy; 2024 TourBooking | All Rights Reserved
                </div>
            </div>
        </footer>
    );
};

export default Footer;
