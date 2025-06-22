import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './ListingDetails.css';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInDays, format } from 'date-fns';
import DatePicker from 'react-datepicker';

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);

  const [form, setForm] = useState({
    guestName: '',
    guestEmail: '',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    stayType: 'short',
    roomType: 'single',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/listings/${id}`);
        const images = res.data.images || [];

        setListing({
          ...res.data,
          galleryItems: images.map(img => ({
            original: img,
            thumbnail: img,
          })),
        });

        if (res.data.unavailableDates) {
          setUnavailableDates(res.data.unavailableDates.map(date => new Date(date)));
        }
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };

    fetchListing();
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const bookingData = {
        ...form,
        listing: id,
        checkInDate: form.checkInDate?.toISOString(),
        checkOutDate: form.checkOutDate?.toISOString(),
      };
      await axios.post('http://localhost:5000/api/bookings', bookingData);
      setMessage('Booking successful!');
    } catch (err) {
      console.error(err);
      setMessage('Booking failed. Please try again.');
    }
  };

  const nights =
    form.checkInDate && form.checkOutDate
      ? differenceInDays(new Date(form.checkOutDate), new Date(form.checkInDate))
      : 0;

  const totalPrice = nights > 0 ? nights * (listing?.pricePerNight || 0) : 0;

  if (!listing) return <div>Loading...</div>;

  return (
    <div className="details-container">
      <h1>{listing.title}</h1>

      <ImageGallery
        items={listing.galleryItems}
        showPlayButton={false}
        showFullscreenButton={false}
        showNav={false}
      />
<div className="price-description-section">
  <p>{listing.description}</p>
  <p><strong>Price per Night: </strong><span className="price-tag">₹{listing.pricePerNight}</span></p>
  <p><strong>Price per Month: </strong><span className="price-tag">₹{listing.pricePerMonth}</span></p>
</div>

      <h2>Book this Stay</h2>
      <div className="booking-section-wrapper">
        <div className="booking-card">
          <form className="booking-form" onSubmit={handleSubmit}>
            <label>
              Guest Name:
              <input type="text" name="guestName" placeholder="Your Name" onChange={handleChange} required />
            </label>

            <label>
              Guest Email:
              <input type="email" name="guestEmail" placeholder="Your Email" onChange={handleChange} required />
            </label>

            <label>
              Check-In Date:
              <DatePicker
                selected={form.checkInDate}
                onChange={(date) => setForm({ ...form, checkInDate: date })}
                excludeDates={unavailableDates}
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select check-in date"
                className="datepicker"
              />
            </label>

            <label>
              Check-Out Date:
              <DatePicker
                selected={form.checkOutDate}
                onChange={(date) => setForm({ ...form, checkOutDate: date })}
                excludeDates={unavailableDates}
                minDate={form.checkInDate || new Date()}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select check-out date"
                className="datepicker"
              />
            </label>

            <label>
              Number of Guests:
              <input type="number" name="numberOfGuests" placeholder="Guests" min="1" onChange={handleChange} />
            </label>

            <label>
              Room Type:
              <select name="roomType" onChange={handleChange}>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
              </select>
            </label>

            <label>
              Stay Type:
              <select name="stayType" onChange={handleChange}>
                <option value="short">Short Stay</option>
                <option value="long">Long Stay</option>
              </select>
            </label>

            <button type="submit" className="book-btn">Book Now</button>
          </form>
          {message && <p>{message}</p>}
        </div>
          <div className="availability-calendar">
    <h3>Unavailable Dates</h3>
    <DatePicker
      inline
      highlightDates={[{ "react-datepicker__day--highlighted-custom": unavailableDates }]}
      excludeDates={unavailableDates}
      minDate={new Date()}
      disabled
      className="inline-calendar"
    />
  </div>
        {message === 'Booking successful!' && (
          <div className="summary-card active">
            <h3>Booking Summary</h3>

            <p><strong>Name:</strong> {form.guestName}</p>
            <p><strong>Room Type:</strong> {form.roomType}</p>
            <p><strong>Stay Type:</strong> {form.stayType}</p>
            <p><strong>Guest:</strong> {form.numberOfGuests}</p>
            <p><strong>Check-in:</strong> {form.checkInDate ? format(form.checkInDate, 'yyyy-MM-dd') : ''}</p>
            <p><strong>Check-out:</strong> {form.checkOutDate ? format(form.checkOutDate, 'yyyy-MM-dd') : ''}</p>
            <p><strong>Nights:</strong> {nights}</p>
            <p><strong>Price/Night:</strong> ₹{listing.pricePerNight}</p>

            <hr />
            <p><strong>Total:</strong> ₹{totalPrice}</p>

            <div className="thank-you-message">
              🎉 <strong>Thank you!</strong> Your booking has been confirmed.<br />
              We’re excited to host you at <strong>{listing.title}</strong>.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingDetails;
