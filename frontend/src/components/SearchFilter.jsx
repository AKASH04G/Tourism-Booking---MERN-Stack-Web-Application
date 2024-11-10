// src/components/SearchFilter.js
import React, { useState } from 'react';
import './SearchFilter.css';

const SearchFilter = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState('all');

    return (
        <section className="search-filter">
            <div className="container">
                <input
                    type="text"
                    placeholder="Search for tours..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                >
                    <option value="all">All Price Ranges</option>
                    <option value="low">Low Cost</option>
                    <option value="medium">Medium Cost</option>
                    <option value="high">Expensive</option>
                </select>
            </div>
        </section>
    );
};

export default SearchFilter;
