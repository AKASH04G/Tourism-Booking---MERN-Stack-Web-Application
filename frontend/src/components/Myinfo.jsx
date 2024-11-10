// MyInfo.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Myinfo.css'; // Create a CSS file for styling
import MyOrders from './Myorders';

const MyInfo = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        dateOfBirth: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/me', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setUser(response.data);
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    phoneNumber: response.data.phoneNumber,
                    address: response.data.address,
                    dateOfBirth: response.data.dateOfBirth
                });
            } catch (err) {
                setError('Failed to fetch user data.');
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5000/api/users/profile', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setUser(response.data);
            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError('Failed to update profile.');
        }
    };

    return (
        <div className="my-info">
            <h1>My Profile</h1>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            {user ? (
                <form onSubmit={handleSubmit} className="profile-form">
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled
                        />
                    </label>
                    <label>
                        Phone Number:
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Address:
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Date of Birth:
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Update Profile</button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
            <div>
                <MyOrders/>
            </div>
        </div>
    );
};

export default MyInfo;
