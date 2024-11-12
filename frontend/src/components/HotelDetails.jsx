import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './HotelDetails.css'; // Custom styles (optional)

const HotelDetails = () => {
    const { hotelId } = useParams();
    const [hotel, setHotel] = useState(null);
    const [bookingData, setBookingData] = useState({
        userName: '',
        numberOfPersons: '',
        checkInDate: '',
        checkOutDate: '',
        roomType: '',
        price: 0
    });
    const [loading, setLoading] = useState(true);

    // Retrieve token from localStorage (or another method)
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // Ensure userId is stored in localStorage

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const response = await axios.get(`https://journeytime-backend.onrender.com/api/hotels/hotels/${hotelId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setHotel(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching hotel details:', error);
                setLoading(false);
            }
        };

        fetchHotel();
    }, [hotelId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingData((prevState) => ({ ...prevState, [name]: value }));

        if (name === 'roomType') {
            const selectedRoom = hotel.rooms.find(room => room.type === value);
            setBookingData((prevState) => ({
                ...prevState,
                price: selectedRoom ? selectedRoom.pricePerNight : 0
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            await axios.post('https://journeytime-backend.onrender.com/api/hotelbooking/book', {
                userId: userId,
                userName: bookingData.userName,
                numberOfPersons: bookingData.numberOfPersons,
                price: bookingData.numberOfPersons * bookingData.price,
                hotelName: hotel.name,
                roomDetails: {
                    type: bookingData.roomType,
                    pricePerNight: hotel.rooms.find(room => room.type === bookingData.roomType)?.pricePerNight || 0,
                    description: hotel.rooms.find(room => room.type === bookingData.roomType)?.description || '',
                    amenities: hotel.rooms.find(room => room.type === bookingData.roomType)?.amenities || [],
                    availableRooms: hotel.rooms.find(room => room.type === bookingData.roomType)?.availableRooms || 0,
                    image: hotel.rooms.find(room => room.type === bookingData.roomType)?.image || '',
                    dateAvailableFrom: bookingData.checkInDate,
                    dateAvailableTo: bookingData.checkOutDate
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Booking successful!');
        } catch (error) {
            console.error('Error creating booking:', error.response?.data || error.message);
            alert('Booking failed. Please try again.');
        }
        console.log('Booking Data:', bookingData);

    };
    

    

    if (loading) return <p>Loading...</p>;
    if (!hotel) return <p>Hotel not found.</p>;

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Img variant="top" src={hotel.image} alt={hotel.name} />
                        <Card.Body>
                            <Card.Title>{hotel.name}</Card.Title>
                            <Card.Text>{hotel.address}</Card.Text>
                            <Card.Text>{hotel.city}</Card.Text>
                            <Card.Text>{hotel.description}</Card.Text>
                            <Card.Text>Rating: {[...Array(Math.round(hotel.rating))].map((_, i) => '⭐')}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <h4>Rooms</h4>
                    {hotel.rooms.map((room) => (
                        <Card key={room._id} className="mb-4">
                            <Card.Img variant="top" src={room.image} alt={room.type} />
                            <Card.Body>
                                <Card.Title>{room.type}</Card.Title>
                                <Card.Text>Price per Night: ₹{room.pricePerNight}</Card.Text>
                                <Card.Text>{room.description}</Card.Text>
                                <Card.Text>Amenities: {room.amenities.join(', ')}</Card.Text>
                                <Card.Text>Available Rooms: {room.availableRooms}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>Book a Room</h4>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUserName">
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="userName"
                                value={bookingData.userName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formNumberOfPersons">
                            <Form.Label>Number of Persons</Form.Label>
                            <Form.Control
                                type="number"
                                name="numberOfPersons"
                                value={bookingData.numberOfPersons}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formCheckInDate">
                            <Form.Label>Check-In Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="checkInDate"
                                value={bookingData.checkInDate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formCheckOutDate">
                            <Form.Label>Check-Out Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="checkOutDate"
                                value={bookingData.checkOutDate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formRoomType">
                            <Form.Label>Room Type</Form.Label>
                            <Form.Control
                                as="select"
                                name="roomType"
                                value={bookingData.roomType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Room Type</option>
                                {hotel.rooms.map((room) => (
                                    <option key={room._id} value={room.type}>
                                        {room.type} - ₹{room.pricePerNight}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Total Price</Form.Label>
                            <Form.Control
                                type="text"
                                name="price"
                                value={`₹${bookingData.numberOfPersons * bookingData.price}`}
                                readOnly
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Book Now
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default HotelDetails;
