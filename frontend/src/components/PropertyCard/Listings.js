// Listings.js
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import PropertyCard from './PropertyCard';
import './Listings.css';
import { useNavigate } from 'react-router-dom';

const Listings = () => {
  const [gurgaonListings, setGurgaonListings] = useState([]);
  const [delhiListings, setDelhiListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const gurgaonScrollRef = useRef(null);
  const delhiScrollRef = useRef(null);
  const navigate = useNavigate();

 // Listings.js
useEffect(() => {
  const fetchListings = async () => {
    try {
      const [gurgaonRes, delhiRes] = await Promise.all([
        axios.get('http://localhost:5000/api/listings/area/gurgaon'),
        axios.get('http://localhost:5000/api/listings/area/delhi'),
      ]);

      console.log('Gurgaon listings:', gurgaonRes.data);
      console.log('Delhi listings:', delhiRes.data);

      setGurgaonListings(gurgaonRes.data);
      setDelhiListings(delhiRes.data);
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError('Error fetching listings');
    } finally {
      setLoading(false);
    }
  };

  fetchListings();
}, []);


  const scroll = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="listings-wrapper">

      {/* Gurgaon Row */}
      <div className="listings-header">
        <h2 className="listings-title" onClick={() => navigate('/area?area=gurgaon')}>
          Homes in Gurgaon <span className="arrow-icon">›</span>
        </h2>
        <div className="scroll-buttons">
          <button onClick={() => scroll(gurgaonScrollRef, 'left')} className="scroll-btn">‹</button>
          <button onClick={() => scroll(gurgaonScrollRef, 'right')} className="scroll-btn">›</button>
        </div>
      </div>

      <div className="listings-scroll-wrapper" ref={gurgaonScrollRef}>
        <div className="listings-horizontal-scroll">
          {gurgaonListings.slice(0, 8).map((listing) => (
            <PropertyCard key={listing._id} listing={listing} />
          ))}
        </div>
      </div>

      {/* Delhi Row */}
      <div className="listings-header">
        <h2 className="listings-title" onClick={() => navigate('/area?area=delhi')}>
          Homes in Delhi <span className="arrow-icon">›</span>
        </h2>
        <div className="scroll-buttons">
          <button onClick={() => scroll(delhiScrollRef, 'left')} className="scroll-btn">‹</button>
          <button onClick={() => scroll(delhiScrollRef, 'right')} className="scroll-btn">›</button>
        </div>
      </div>

      <div className="listings-scroll-wrapper" ref={delhiScrollRef}>
        <div className="listings-horizontal-scroll">
          {delhiListings.slice(0, 8).map((listing) => (
            <PropertyCard key={listing._id} listing={listing} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Listings;
