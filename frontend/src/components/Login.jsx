import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Separate CSS file for Login component
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth'; // Updated import path for useAuth

const googleLogo = './images/Googleicon.png';
const facebookLogo = 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // Get login method from context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://journeytime-backend.onrender.com/api/users/login', {
                email,
                password,
            });
            
            if (response.data.token) {
                // Assuming the token is returned in response.data.token
                login(response.data.token); // Pass the token to login function
                navigate('/');
            } else {
                setError(response.data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred during login.');
        }
    };

    const handleGoogleLogin = () => {
        console.log('Login with Google');
        // Implement Google login logic here
    };

    const handleFacebookLogin = () => {
        console.log('Login with Facebook');
        // Implement Facebook login logic here
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="login-form-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="login-form-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
                {error && <p className="error-message">{error}</p>}
            </form>

            <div className="social-login">
                <button className="google-btn" onClick={handleGoogleLogin}>
                    <img src={googleLogo} alt="Google Logo" /> Login with Google
                </button>
                <button className="facebook-btn" onClick={handleFacebookLogin}>
                    <img src={facebookLogo} alt="Facebook Logo" /> Login with Facebook
                </button>
            </div>

            <p>Don't have an account? <a href="/signup">Sign up here</a></p>
        </div>
    );
};

export default Login;
