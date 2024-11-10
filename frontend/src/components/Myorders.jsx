import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Myorders.css';

const MyOrders = () => {
    const [orders, setOrders] = useState({ hotels: [], packages: [], trains: [], buses: [] });
    const [error, setError] = useState('');
    const [userName, setUserName] = useState('User');
    const [expandedOrderIds, setExpandedOrderIds] = useState({ hotels: [], packages: [], trains: [], buses: [] });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found');
                    return;
                }

                const hotelResponse = await axios.get('https://journeytime-backend.onrender.com/api/hotelbooking/bookings', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const packageResponse = await axios.get('https://journeytime-backend.onrender.com/api/packageBookings/my-bookings', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const trainResponse = await axios.get('https://journeytime-backend.onrender.com/api/train-bookings/my-bookings', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const busResponse = await axios.get('https://journeytime-backend.onrender.com/api/bookings/', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setOrders({
                    hotels: hotelResponse.data || [],
                    packages: packageResponse.data || [],
                    trains: trainResponse.data || [],
                    buses: busResponse.data || []
                });

                const userResponse = await axios.get('https://journeytime-backend.onrender.com/api/users/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserName(userResponse.data.name || 'User');
            } catch (err) {
                console.error('Error fetching orders:', err.response ? err.response.data : err.message);
                setError('An error occurred while fetching orders.');
            }
        };

        fetchOrders();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString();
    };

    const handleToggleExpand = (id, type) => {
        setExpandedOrderIds((prev) => ({
            ...prev,
            [type]: prev[type].includes(id) ? prev[type].filter((itemId) => itemId !== id) : [...prev[type], id]
        }));
    };

    return (
        <div className="orders-container">
            <h2>Welcome, {userName}</h2>
            {error && <p className="error-message">{error}</p>}

            <h3>Hotel Bookings</h3>
            {orders.hotels.length === 0 ? (
                <p>No hotel bookings found.</p>
            ) : (
                orders.hotels.map((order) => (
                    <div key={order._id} className="order-card">
                        <div className="order-header" onClick={() => handleToggleExpand(order._id, 'hotels')}>
                            <h6>Order ID: {order._id}</h6>
                            <p><strong>Hotel:</strong> {order.hotelName || 'Unknown Hotel'}</p>
                            <span className="expand-icon">{expandedOrderIds.hotels.includes(order._id) ? '-' : '+'}</span>
                        </div>
                        {expandedOrderIds.hotels.includes(order._id) && (
                            <div className="order-details">
                                <p><strong>Room Type:</strong> {order.roomDetails.type || 'N/A'}</p>
                                <p><strong>Price per Night:</strong> ₹{order.roomDetails.pricePerNight || 0}</p>
                                <p><strong>Description:</strong> {order.roomDetails.description || 'N/A'}</p>
                                <p><strong>Amenities:</strong> {order.roomDetails.amenities?.join(', ') || 'N/A'}</p>
                                <p><strong>Available Rooms:</strong> {order.roomDetails.availableRooms || 0}</p>
                                <p><strong>Image:</strong> <img src={order.roomDetails.image} alt="Hotel Room" className="order-image" /></p>
                                <p><strong>Check-in Date:</strong> {formatDate(order.roomDetails.dateAvailableFrom)}</p>
                                <p><strong>Check-out Date:</strong> {formatDate(order.roomDetails.dateAvailableTo)}</p>
                                <p><strong>Number of Persons:</strong> {order.numberOfPersons || 'N/A'}</p>
                            </div>
                        )}
                    </div>
                ))
            )}

<h3>Package Bookings</h3>
            {orders.packages.length === 0 ? (
                <p>No package bookings found.</p>
            ) : (
                orders.packages.map((order) => (
                    <div key={order._id} className="order-card">
                        <div className="order-header" onClick={() => handleToggleExpand(order._id, 'packages')}>
                            <h6>Order ID: {order._id}</h6>
                            <p><strong>Package:</strong> {order.packageId && order.packageId.name ? order.packageId.name : 'Unknown Package'}</p>
                            <span className="expand-icon">{expandedOrderIds.packages.includes(order._id) ? '-' : '+'}</span>
                        </div>
                        {expandedOrderIds.packages.includes(order._id) && (
                            <div className="order-details">
                                <p><strong>Booking Reference:</strong> {order.bookingRef || 'N/A'}</p>
                                <p><strong>Start Date:</strong> {formatDate(order.startDate)}</p>
                                <p><strong>End Date:</strong> {formatDate(order.endDate)}</p>
                                <p><strong>Adults Male:</strong> {order.adultsMale || 0}</p>
                                <p><strong>Adults Female:</strong> {order.adultsFemale || 0}</p>
                                <p><strong>Children:</strong> {order.children || 0}</p>
                                <p><strong>Special Requests:</strong> {order.specialRequests || 'None'}</p>
                            </div>
                        )}
                    </div>
                ))
            )}

            <h3>Train Bookings</h3>
            {orders.trains.length === 0 ? (
                <p>No train bookings found.</p>
            ) : (
                orders.trains.map((order) => (
                    <div key={order._id} className="order-card">
                        <div className="order-header" onClick={() => handleToggleExpand(order._id, 'trains')}>
                            <h6>Order ID: {order._id}</h6>
                            <p><strong>Train:</strong> {order.train?.name || 'Unknown Train'}</p>
                            <span className="expand-icon">{expandedOrderIds.trains.includes(order._id) ? '-' : '+'}</span>
                        </div>
                        {expandedOrderIds.trains.includes(order._id) && (
                            <div className="order-details">
                                <p><strong>Class:</strong> {order.className || 'N/A'}</p>
                                <p><strong>Passengers:</strong> {order.passengers || 'N/A'}</p>
                                <p><strong>Total Price:</strong> ${order.totalPrice || 0}</p>
                                <p><strong>Booking Date:</strong> {formatDate(order.createdAt)}</p>
                            </div>
                        )}
                    </div>
                ))
            )}

            <h3>Bus Bookings</h3>
            {orders.buses.length === 0 ? (
                <p>No bus bookings found.</p>
            ) : (
                orders.buses.map((order) => (
                    <div key={order._id} className="order-card">
                        <div className="order-header" onClick={() => handleToggleExpand(order._id, 'buses')}>
                            <h6>Order ID: {order._id}</h6>
                            <p><strong>Bus:</strong> {order.bus?.name || 'Unknown Bus'}</p>
                            <span className="expand-icon">{expandedOrderIds.buses.includes(order._id) ? '-' : '+'}</span>
                        </div>
                        {expandedOrderIds.buses.includes(order._id) && (
                            <div className="order-details">
                                <p><strong>Class:</strong> {order.className || 'N/A'}</p>
                                <p>
                                    <strong>Passengers:</strong> 
                                    {order.passengers 
                                        ? `Adults: ${order.passengers.adults || 0}, Children: ${order.passengers.children || 0}`
                                        : 'N/A'
                                    }
                                </p>
                                <p><strong>Total Price:</strong> ${order.totalPrice || 0}</p>
                                <p><strong>Booking Date:</strong> {formatDate(order.createdAt)}</p>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default MyOrders;
 
