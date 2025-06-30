import React, { useState } from 'react';
import axios from 'axios';
import './BecomeHostForm.css';

const BecomeHostForm = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    area: '',
    address: '',
    pricePerNight: '',
    pricePerMonth: '',
    maxGuests: '',
    stayType: 'short',
    roomType: 'single',
    available: true,
    images: [], // new field
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
    setForm(prev => ({ ...prev, images: files }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'images') {
          value.forEach((file) => formData.append('images', file));
        } else {
          formData.append(key, value);
        }
      });

      await axios.post('https://stayfinder-backend.onrender.com/api/listings', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage('Listing created successfully!');
      setForm({
        title: '',
        description: '',
        area: '',
        address: '',
        pricePerNight: '',
        pricePerMonth: '',
        maxGuests: '',
        stayType: 'short',
        roomType: 'single',
        available: true,
        images: [],
      });
      setImagePreviews([]);
    } catch (err) {
      console.error(err);
      setMessage('Error creating listing.');
    }
  };

  return (
    <div className="host-form-container">
      <h2>Become a Host</h2>
      <form onSubmit={handleSubmit} className="host-form" encType="multipart/form-data">
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input type="text" name="area" placeholder="Area" value={form.area} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <input type="number" name="pricePerNight" placeholder="Price Per Night" value={form.pricePerNight} onChange={handleChange} required />
        <input type="number" name="pricePerMonth" placeholder="Price Per Month" value={form.pricePerMonth} onChange={handleChange} required />
        <input type="number" name="maxGuests" placeholder="Max Guests" value={form.maxGuests} onChange={handleChange} required />

        <label>Stay Type:</label>
        <select name="stayType" value={form.stayType} onChange={handleChange}>
          <option value="short">Short</option>
          <option value="long">Long</option>
        </select>

        <label>Room Type:</label>
        <select name="roomType" value={form.roomType} onChange={handleChange}>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="suite">Suite</option>
        </select>

        <label>
          <input type="checkbox" name="available" checked={form.available} onChange={handleChange} />
          Available
        </label>

        <label>Upload Images:</label>
        <input type="file" multiple accept="image/*" onChange={handleImageChange} />

        <div className="image-preview-container">
          {imagePreviews.map((src, i) => (
            <img key={i} src={src} alt={`preview-${i}`} className="image-thumb" />
          ))}
        </div>

        <button type="submit">Submit Listing</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default BecomeHostForm;
