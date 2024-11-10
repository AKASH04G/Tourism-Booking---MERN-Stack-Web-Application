// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExploreIndia from './components/ExploreIndia';
import TripPlanner from './components/TripPlanner';
import UniqueProperties from './components/UniqueProperties';
import Offers from './components/Offers';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import CityPackages from './components/CityPackages';
import ConsultationForm from './components/ConsultationForm';
import PackageDetails from './components/PackageDetails';
import TrendingTourDetails from './components/TrendingTourDetails';
import SearchFilter from './components/SearchFilter';
import TrainBooking from './components/TrainBookin.jsx';
import BookingConfirmation from './components/BookingConfirmation.jsx';
import BusBooking from './components/BusBooking.jsx';
import AboutContact from './components/AboutContact.jsx';
import { AuthProvider, useAuth } from './components/Auth';
import Orders from './components/Myorders.jsx';
import MyInfo from './components/Myinfo.jsx';
import BusBookingConfirmation from "./components/BusBookingConfirmation";
 import HotelDetails from './components/HotelDetails.jsx';
import HotelList from './components/HotelList.jsx';
const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedTour, setSelectedTour] = useState(null);

    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Hero />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/explore-india" element={<ExploreIndia />} />
                        <Route path="/trip-planner" element={<ProtectedRoute element={<TripPlanner />} />} />
                        <Route path="/unique-properties" element={<ProtectedRoute element={<UniqueProperties />} />} />
                        <Route path="/offers" element={<ProtectedRoute element={<Offers />} />} />
                        <Route path="/search" element={<ProtectedRoute element={<SearchFilter />} />} />
                        <Route path="/consultation-form" element={<ProtectedRoute element={<ConsultationForm />} />} />
                        <Route path="/city-packages/:cityName" element={<ProtectedRoute element={<CityPackages />} />} />
                        <Route path="/package-details" element={<ProtectedRoute element={<PackageDetails />} />} />
                        <Route path="/trending-tour-details" element={selectedTour ? <ProtectedRoute element={<TrendingTourDetails tour={selectedTour} />} /> : <p>Tour not found.</p>} />
                        <Route path="/train-booking" element={<ProtectedRoute element={<TrainBooking />} />} />
                        <Route path="/bookingconfirmation" element={<ProtectedRoute element={<BookingConfirmation />} />} />
                        <Route path="/busbookingconfirmation" element={<ProtectedRoute element={<BusBookingConfirmation />} />} />

                        <Route path="/busbooking" element={<ProtectedRoute element={<BusBooking />} />} />
                        <Route path="/AboutContact" element={<ProtectedRoute element={<AboutContact />} />} />
                        <Route path="/my-orders" element={<ProtectedRoute element={<Orders />} />} />
                        <Route path="/my-info" element={<ProtectedRoute element={<MyInfo />} />} />
                         <Route path="/hotels" element={<HotelList />} /> 
                <Route path="/hotelsdetail/:hotelId" element={<HotelDetails />} /> 
            
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
