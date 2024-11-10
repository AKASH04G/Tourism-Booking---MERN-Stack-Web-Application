// src/components/AdminDashboard.js
import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    return (
        <section className="admin-dashboard">
            <div className="container">
                <h2>Admin Dashboard</h2>
                <div className="admin-controls">
                    <button>Manage Tours</button>
                    <button>Manage Bookings</button>
                    <button>View Reports</button>
                </div>
            </div>
        </section>
    );
};

export default AdminDashboard;
