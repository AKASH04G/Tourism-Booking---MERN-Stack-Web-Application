import React, { useState } from 'react';
import './TrendingTourDetails.css';

const TrendingTourDetails = ({ tour }) => {
    const [formData, setFormData] = useState({
        date: '',
        numAdults: 1,
        numChildren: 0,
        numInfants: 0,
        additionalInfo: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission (e.g., send data to backend)
    };

    return (
        <div className="tour-details">
            <div className="tour-image">
                <img src={tour.image} alt={tour.name} />
            </div>
            <div className="tour-info">
                <h1>{tour.name}</h1>
                <p>{tour.description}</p>
                <h3>Price: {tour.price}</h3>
                <h4>{tour.stays}</h4>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="date">Select Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="numAdults">Number of Adults:</label>
                        <input
                            type="number"
                            id="numAdults"
                            name="numAdults"
                            min="1"
                            value={formData.numAdults}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="numChildren">Number of Children:</label>
                        <input
                            type="number"
                            id="numChildren"
                            name="numChildren"
                            min="0"
                            value={formData.numChildren}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="numInfants">Number of Infants:</label>
                        <input
                            type="number"
                            id="numInfants"
                            name="numInfants"
                            min="0"
                            value={formData.numInfants}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="additionalInfo">Additional Information:</label>
                        <textarea
                            id="additionalInfo"
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-btn">Book Now</button>
                </form>
            </div>
        </div>
    );
};

export default TrendingTourDetails;
