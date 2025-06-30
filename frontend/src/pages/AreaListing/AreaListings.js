import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ListingCard from '../../components/PropertyCard/PropertyCard'; 
import './AreaListings.css';

const AreaListings = () => {
  const [listings, setListings] = useState([]);
  const [area, setArea] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedArea = params.get('area');
    setArea(selectedArea);

    const fetchListings = async () => {
      try {
       const res = await axios.get(`https://stayfinder-backend.onrender.com/api/listings/area/${selectedArea}`);

        setListings(res.data);
      } catch (err) {
        console.error('Error fetching listings:', err);
      }
    };

    if (selectedArea) fetchListings();
  }, [location.search]);

  return (
    <div className="area-listings-container">
      <h1>Homes in {area}</h1>
      <div className="listing-grid">
        {listings.map(listing => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default AreaListings;
