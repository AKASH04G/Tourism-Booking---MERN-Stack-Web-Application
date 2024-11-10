// HotelCard.js
import React from 'react';
import { Card } from 'react-bootstrap';
import './hotelCard.css'; // Custom styles (optional)

const HotelCard = ({ hotel }) => {
    return (
        <Card className="hotel-card">
            <Card.Img variant="top" src={hotel.image} alt={hotel.name} />
            <Card.Body>
                <Card.Title>{hotel.name}</Card.Title>
                <Card.Text>{hotel.address}</Card.Text>
                <Card.Text>{hotel.description}</Card.Text>
                <Card.Text>Rating: {hotel.rating}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default HotelCard;
