// src/components/UserReviews.js
import React from 'react';
import './UserReviews.css';

const UserReviews = () => {
    const reviews = [
        { user: 'Alice', rating: 5, comment: 'Amazing experience! Highly recommended.' },
        { user: 'Bob', rating: 4, comment: 'Very enjoyable, but could use more options.' },
        { user: 'Charlie', rating: 3, comment: 'Good, but the service was a bit lacking.' }
    ];

    return (
        <section className="user-reviews">
            <div className="container">
                <h2>User Reviews</h2>
                <div className="review-list">
                    {reviews.map((review, index) => (
                        <div className="review" key={index}>
                            <h4>{review.user}</h4>
                            <p>Rating: {review.rating} / 5</p>
                            <p>{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UserReviews;
