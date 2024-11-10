import React, { useState } from 'react';
import './ConsultationForm.css';

const ConsultationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        address: '',
        preferredPlaces: '',
        language: '',
        timeToCall: '',
        numberOfPeople: { adults: '', children: '' },
        additionalInfo: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePeopleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            numberOfPeople: {
                ...formData.numberOfPeople,
                [name]: value,
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you, ${formData.name}, for booking a consultation! We will reach out to you soon.`);
        // Add code to handle form submission
    };

    return (
        <div className="consultation-form-container">
            <h2>Plan Your Perfect Trip</h2>
            <p>We are here to help you plan a customized trip based on your preferences. Please fill out the form below, and our travel experts will get in touch with you to make your dream vacation come true.</p>
            <form className="consultation-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>WhatsApp No:</label>
                    <input
                        type="text"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Preferred Places:</label>
                    <input
                        type="text"
                        name="preferredPlaces"
                        value={formData.preferredPlaces}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Language:</label>
                    <input
                        type="text"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Time to Call:</label>
                    <input
                        type="text"
                        name="timeToCall"
                        value={formData.timeToCall}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Number of People:</label>
                    <div className="people-group">
                        <input
                            type="number"
                            name="adults"
                            placeholder="Adults"
                            value={formData.numberOfPeople.adults}
                            onChange={handlePeopleChange}
                        />
                        <input
                            type="number"
                            name="children"
                            placeholder="Children"
                            value={formData.numberOfPeople.children}
                            onChange={handlePeopleChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Additional Info:</label>
                    <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        placeholder="Any other details you would like to share."
                    />
                </div>
                <button className="btn" type="submit">Submit</button>
            </form>
            <p className="form-note">Our team will review your request and contact you within 24 hours to discuss your customized trip plan. We look forward to helping you create unforgettable travel experiences!</p>
        </div>
    );
};

export default ConsultationForm;
