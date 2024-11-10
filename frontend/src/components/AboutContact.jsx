import React from 'react';
import './AboutContact.css';

const AboutContact = () => {
    return (
        <div className="about-contact-container">
            <div className="about-container">
                <div className="about-section">
                    <h2>About Us</h2>
                    <p>
                        Welcome to TourBooking, your ultimate destination for discovering the best travel experiences across India. Our platform is designed to help you explore top tourist locations, plan your trips effortlessly, and stay at unique properties. We are committed to making your travel dreams a reality by offering comprehensive travel solutions tailored to your preferences.
                    </p>
                    <p>
                        <strong>Our Reforms:</strong> 
                        We continually strive to innovate and improve our services, ensuring that we offer the latest and most reliable travel solutions. From the introduction of eco-friendly travel options to the integration of AI-driven trip planning tools, we are at the forefront of travel industry reforms.
                    </p>
                    <p>
                        <strong>Our Motivation:</strong>
                        Our motivation stems from our passion for travel and a deep desire to make travel accessible and enjoyable for everyone. We believe that exploring new places and experiencing different cultures should be seamless and stress-free.
                    </p>
                </div>
            </div>

            <div className="links-container">
                <div className="links-section">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/explore-india">Explore India</a></li>
                        <li><a href="/trip-planner">Trip Planner</a></li>
                        <li><a href="/unique-properties">Unique Properties</a></li>
                        <li><a href="/offers">Offers</a></li>
                    </ul>
                </div>
            </div>

           

            <div className="contact-container">
                <div className="contact-section">
                    <h2>Contact Us</h2>
                    <form className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone:</label>
                            <input type="tel" id="phone" name="phone" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address:</label>
                            <textarea id="address" name="address" rows="3" required></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message:</label>
                            <textarea id="message" name="message" rows="5" required></textarea>
                        </div>
                        <div className="form-group">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
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
    );
};

export default AboutContact;
