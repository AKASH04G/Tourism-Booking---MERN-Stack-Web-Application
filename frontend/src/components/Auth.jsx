// src/components/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
 
    useEffect(() => {
        setIsAuthenticated(!!token);
    }, [token]);

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setIsAuthenticated(true);
          
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setIsAuthenticated(false);
         
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
