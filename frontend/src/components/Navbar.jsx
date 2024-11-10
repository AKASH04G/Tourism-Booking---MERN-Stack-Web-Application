import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faHome, faMapMarkedAlt, faSuitcase, faTag, faTrain, faBus, faCar, faInfoCircle, faChevronDown, faHotel } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './Auth'; // Import useAuth from AuthContext

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen1, setDropdownOpen1] = useState(false);
    const { isAuthenticated, logout } = useAuth(); // Get authentication state and logout method

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleDropdown1 = () => setDropdownOpen1(!dropdownOpen1);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">
                    <FontAwesomeIcon icon={faHome} /> JourneyTime
                </Link>
            </div>
            <div className="navbar-profile" onClick={toggleDropdown1} onMouseEnter={() => setDropdownOpen1(true)} onMouseLeave={() => setDropdownOpen1(false)}>
                <div className="profile-icon">
                    Explore Tours <FontAwesomeIcon icon={faChevronDown} className={`dropdown-arrow ${dropdownOpen1 ? 'open' : ''}`} />
                </div>
                {dropdownOpen1 && (
                    <div className="dropdown-menunavbar">
                        <Link to="/explore-india">
                            <FontAwesomeIcon icon={faMapMarkedAlt} /> Explore India
                        </Link>
                        <Link to="/unique-properties">
                            <FontAwesomeIcon icon={faSuitcase} /> Unique Properties
                        </Link>
                        <Link to="/offers">
                            <FontAwesomeIcon icon={faTag} /> Offers
                        </Link>
                    </div>
                )}
            </div>
            <div className="navbar-links">
                <Link to="/consultation-form">
                    <FontAwesomeIcon icon={faSuitcase} /> Trip Planner
                </Link>
                <Link to="/train-booking">
                    <FontAwesomeIcon icon={faTrain} /> Trains
                </Link>
                <Link to="/busbooking">
                    <FontAwesomeIcon icon={faBus} /> Buses
                </Link>
                <Link to="/Hotels">
                    <FontAwesomeIcon icon={faHotel} /> Hotels
                </Link>
                <Link to="/AboutContact">
                    <FontAwesomeIcon icon={faInfoCircle} /> About Us
                </Link>
            </div>

            <div className="navbar-profile" onClick={toggleDropdown} onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                <div className="profile-icon">
                    {isAuthenticated ? (
                        <>
                            <FontAwesomeIcon icon={faUserCircle} size="2x" />
                            <FontAwesomeIcon icon={faChevronDown} className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} />
                        </>
                    ) : (
                        <Link to="/login" className="login-link">Login</Link>
                    )}
                </div>
                {dropdownOpen && isAuthenticated && (
                    <div className="dropdown-menunavbar">
                        <Link to="/my-orders">My Orders</Link>
                        <Link to="/my-info">My Profile</Link>
                         <button onClick={logout}>Logout</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
