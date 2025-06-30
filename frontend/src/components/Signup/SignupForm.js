import React, { useState } from 'react';
import axios from 'axios';
import './SignupForm.css';

const SignupForm = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://stayfinder-backend.onrender.com/api/auth/signup', form);
      setMessage('Signup successful! You can now log in.');
      console.log(res.data); // You may store token or show message
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Signup failed. Try again.');
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Create an Account</h2>

      <label>Full Name</label>
      <input type="text" name="username" placeholder="John Doe" required onChange={handleChange} />

      <label>Email</label>
      <input type="email" name="email" placeholder="you@example.com" required onChange={handleChange} />

      <label>Password</label>
      <input type="password" name="password" placeholder="••••••••" required onChange={handleChange} />

      <button type="submit">Sign Up</button>

      {message && <p style={{ marginTop: '10px', color: '#1e40af' }}>{message}</p>}
    </form>
  );
};

export default SignupForm;
