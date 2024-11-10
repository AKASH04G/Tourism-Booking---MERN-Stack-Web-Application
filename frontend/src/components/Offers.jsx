import React, { useState, useEffect } from 'react';
 import './Offers.css';

const Offers = () => {
    const offers = [
        {
          "id": 1,
          "title": "Special Rates for Varanasi Spiritual Journey",
          "description": "Experience the spiritual essence of Varanasi with exclusive rates this season.",
          "discountPercentage": 15,
          "applicableTours": ["Varanasi Spiritual Journey"],
          "validFrom": "2024-11-01",
          "validTo": "2024-12-31",
          "terms": "Offer valid for a limited period only. Subject to availability.",
          "image": "https://th.bing.com/th/id/R.e5e1a190fc7e45b1507ccd3a80f36050?rik=y0RrMbsX9k6gCw&riu=http%3a%2f%2fwww.makemytrip.com%2ftravel-guide%2fmedia%2fdg_image%2fvaranasi%2fthumb%2fVaranasi%2c-India_0_19_161_varanasi_938_410.jpg&ehk=68%2fRlIzXpm7az%2fwBYAq9QGJ1er2QgFKasXJadkUt2bI%3d&risl=&pid=ImgRaw&r=0"
        },
        {
          "id": 2,
          "title": "Exclusive Mumbai City Explorer Deals",
          "description": "Discover Mumbai's hidden gems with special discounts on city explorer tours.",
          "discountPercentage": 10,
          "applicableTours": ["Mumbai City Explorer"],
          "validFrom": "2024-10-15",
          "validTo": "2024-12-31",
          "terms": "Cannot be combined with other offers.",
          "image": "https://swarajya.gumlet.io/swarajya/2023-02/da5d01e1-0749-4601-9cc9-475199923702/mumbai_coastal_road.jpg"
        },
        {
          "id": 3,
          "title": "Early Bird Discount on Delhi Heritage Walk",
          "description": "Book early for the Delhi Heritage Walk and save big!",
          "discountPercentage": 20,
          "applicableTours": ["Delhi Heritage Walk"],
          "validFrom": "2024-01-01",
          "validTo": "2024-12-31",
          "terms": "Bookings must be made 60 days in advance.",
          "image": "https://thumbs.dreamstime.com/b/red-fort-built-sandstone-one-most-visited-landmarks-new-delhi-india-152559767.jpg"
        },
        {
          "id": 4,
          "title": "Buy 1 Get 1 Free on Jaipur Tours",
          "description": "Enjoy Jaipur's rich heritage with a Buy 1 Get 1 Free offer on select tours.",
          "discountPercentage": 50,
          "applicableTours": ["Jaipur City Tour"],
          "validFrom": "2024-11-01",
          "validTo": "2024-12-15",
          "terms": "Applicable for group bookings only.",
          "image": "/images/jaipur.jpg"
        },
        {
          "id": 5,
          "title": "20% Off on Goa Beach Packages",
          "description": "Get a flat 20% discount on beach packages for a perfect Goa getaway.",
          "discountPercentage": 20,
          "applicableTours": ["Goa Beach Package"],
          "validFrom": "2024-11-01",
          "validTo": "2025-01-15",
          "terms": "Available on all beach packages. Limited time offer.",
          "image": "/images/20off.jpg"
        }
      ]
     

    return (
        <section className="offers" id="offer">
            <div className="container">
                <h2>Current Offers</h2>
                <div className="offer-container">
                    {offers.map((offer) => (
                        <div className="offer-card" key={offer.id}>
                            <div className="offer-image">
                                <img src={offer.image} alt={offer.title} />
                                {offer.discountPercentage && (
                                    <div className="offer-discount">
                                        {offer.discountPercentage}% OFF
                                    </div>
                                )}
                            </div>
                            <div className="offer-content">
                                <h3>{offer.title}</h3>
                                <p>{offer.description}</p>
                                <p className="offer-validity">
                                    Valid from {offer.validFrom} to {offer.validTo}
                                </p>
                                <button className="btn">Book Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Offers;
