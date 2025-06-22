import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import AuthModal from '../../components/AuthModal';
import './Navbar.css';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    updateUser();

    // Listen to login/logout events
    window.addEventListener('userLoggedIn', updateUser);
    window.addEventListener('storage', updateUser);

    return () => {
      window.removeEventListener('userLoggedIn', updateUser);
      window.removeEventListener('storage', updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbarlogo">
          <Link to="/">StayFinder</Link>
        </div>

        <ul className="navbarlinks">
          <li><Link to="/become-a-host">Become a Host</Link></li>
          <li><a href="#help">Help</a></li>

          {!user ? (
            <li>
              <button className="btn btn-filled" onClick={() => setShowModal(true)}>
                Sign Up
              </button>
            </li>
          ) : (
            <li className="user-dropdown">
              <div
                className="user-toggle"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.username} 
              </div>

              {dropdownOpen && (
                <div className="dropdown-menu">
                   <button className="btn btn-filled" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </li>
          )}
        </ul>
      </nav>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
  <AuthModal onClose={() => setShowModal(false)} />
</Modal>
    </>
  );
};

export default Navbar;
