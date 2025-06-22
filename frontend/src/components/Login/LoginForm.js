import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = ({ closeModal }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // 🔔 Notify the app
      window.dispatchEvent(new Event('userLoggedIn'));

      setMessage('Login successful!');
      navigate('/');

      // ✅ Auto-close the modal
      if (closeModal) closeModal();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Login failed. Please check credentials.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Welcome Back</h2>

      <label>Username</label>
      <input
        type="text"
        name="username"
        placeholder="your_username"
        required
        onChange={handleChange}
      />

      <label>Password</label>
      <input
        type="password"
        name="password"
        placeholder="••••••••"
        required
        onChange={handleChange}
      />

      <button type="submit">Login</button>

      {message && <p style={{ marginTop: '10px', color: '#1e40af' }}>{message}</p>}
    </form>
  );
};

export default LoginForm;
