import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HotelList.css'; // Make sure this file is linked
import { Link } from 'react-router-dom';
const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hotels/'); // Replace with your actual API endpoint
        setHotels(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleViewDetails = (hotelId) => {
     navigate(`/hotelsdetail/${hotelId}`); // Navigate to HotelDetails page
  };

  return (
    <div className="hotel-list">
      {hotels.length === 0 ? (
        <p>No hotels available</p>
      ) : (
        hotels.map((hotel) => (
          <div key={hotel._id} className="hotel-card">
            <img src={hotel.image} alt={hotel.name} className="hotel-image" />
            <div className="hotel-info">
              <h2 className="hotel-name">{hotel.name}</h2>
              <p className="hotel-address">{hotel.address}</p>
              <p className="hotel-description">{hotel.description}</p>
              <p className="hotel-rating">Rating: {hotel.rating}</p>
              <button className="view-details-button1" onClick={() => handleViewDetails(hotel._id)}><Link to={`/hotelsdetail/${hotel._Id}`}className="view-details-button1">View Details</Link></button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HotelList;
