import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Separate CSS file for Signup component
import { useNavigate } from 'react-router-dom';

const googleLogo = './images/Googleicon.png';
const facebookLogo = 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://journeytime-backend.onrender.com/api/users/register', {
                name,
                email,
                password,
            });

            if (response.data.message === 'User registered successfully') {
                navigate('/login'); // Redirect to login page on successful signup
            } else {
                setError(response.data.message || 'Signup failed'); // Show error message
            }
        } catch (err) {
            console.error('Signup error:', err);
            setError('An error occurred during signup.');
        }
    };

    const handleGoogleSignup = () => {
        console.log('Signup with Google');
        // Implement Google signup logic here (OAuth)
    };

    const handleFacebookSignup = () => {
        console.log('Signup with Facebook');
        // Implement Facebook signup logic here (OAuth)
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div className="signup-form-group">
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="signup-form-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="signup-form-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
                {error && <p className="error-message">{error}</p>}
            </form>

            <div className="social-signup">
                <button className="google-btn" onClick={handleGoogleSignup}>
                    <img src={googleLogo} alt="Google Logo" /> Sign Up with Google
                </button>
                <button className="facebook-btn" onClick={handleFacebookSignup}>
                    <img src={facebookLogo} alt="Facebook Logo" /> Sign Up with Facebook
                </button>
            </div>

            <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
    );
};

export default Signup;
