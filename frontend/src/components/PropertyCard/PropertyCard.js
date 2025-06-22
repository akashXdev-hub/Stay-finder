// PropertyCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PropertyCard.css';

const PropertyCard = ({ listing }) => {
  return (
    <Link
      to={`/listings/${listing._id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="property-card">
        <img
          src={listing.images[0] || 'https://via.placeholder.com/400x250?text=No+Image'}
          alt={listing.title}
          className="property-image"
        />
        <div className="property-details">
          <h2 className="property-title">{listing.title}</h2>
          <p className="property-price"><strong>Rs.</strong> {listing.pricePerNight} / night</p>
          <p className="property-price"><strong>Rs.</strong> {listing.pricePerMonth} / month</p>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
