import React, { useState } from 'react';
import { FaMapMarkerAlt, FaRegCalendarAlt } from 'react-icons/fa';

const locations = ["New York", "Sydney", "Melbourne", "Sharjah"];

interface SearchSectionProps
{
    onSearch: (filters: { from: string; to: string; date: string }) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) =>
{
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');

    const handleSearch = () =>
    {
        onSearch({ from, to, date });
    };

    return (
        <section className="search-section">
            <h1 className="search-title">Find Your Next Journey</h1>
            <p className="search-subtitle">Discover available trips and book your seats with ease.</p>

            <div className="search-container">
                <div className="search-input-group">
                    <label className="search-label">From</label>
                    <div className="search-input-wrapper">
                        <select value={from} onChange={(e) => setFrom(e.target.value)} className="search-input">
                            <option value="">Departure Location</option>
                            {locations.map((loc, i) => (
                                <option key={i} value={loc}>{loc}</option>
                            ))}
                        </select>
                        <FaMapMarkerAlt className="search-icon" />
                    </div>
                </div>

                <div className="search-input-group">
                    <label className="search-label">To</label>
                    <div className="search-input-wrapper">
                        <select value={to} onChange={(e) => setTo(e.target.value)} className="search-input">
                            <option value="">Arrival Location</option>
                            {locations.map((loc, i) => (
                                <option key={i} value={loc}>{loc}</option>
                            ))}
                        </select>
                        <FaMapMarkerAlt className="search-icon" />
                    </div>
                </div>

                <div className="search-input-group">
                    <label className="search-label">Date</label>
                    <div className="search-input-wrapper">
                        <input
                            id='date'
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="search-input"
                            style={{ zIndex: 0 }}
                        />
                        <FaRegCalendarAlt className="search-icon" />
                    </div>
                </div>

                <button className="search-button" onClick={handleSearch}>Search Trips</button>
            </div>
        </section>
    );
};

export default SearchSection;
