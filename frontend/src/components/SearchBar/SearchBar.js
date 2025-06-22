import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    console.log({ location, checkIn, checkOut, guests });
    // Navigate or search logic here
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-box">
        <div className="search-field where">
          <label>Where</label>
          <input
            type="text"
            placeholder="Search destinations"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="search-field check">
          <label>Check in</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>

        <div className="search-field check">
          <label>Check out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        <div className="search-field who">
          <div>
            <label>Who</label>
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="Add guests"
            />
          </div>
          <button className="search-btn" onClick={handleSearch}>
            <FaSearch className="search-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
