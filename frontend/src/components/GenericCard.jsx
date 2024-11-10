// src/components/GenericCard.js
import React from 'react';
import './GenericCard.css';

const GenericCard = ({ image, title, description, buttonLabel, onClick }) => {
    return (
        <div className="generic-card">
            <img src={image} alt={title} />
            <h3>{title}</h3>
            {description && <p>{description}</p>}
            {buttonLabel && <button onClick={onClick}>{buttonLabel}</button>}
        </div>
    );
};

export default GenericCard;
