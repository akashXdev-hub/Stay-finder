import React, { useState } from 'react';
import SignupForm from './Signup/SignupForm';
import LoginForm from './Login/LoginForm';

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      {isLogin ? (
        <>
          <LoginForm closeModal={onClose} />
          <p style={{ marginTop: '10px' }}>
            Don't have an account?{' '}
            <span
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => setIsLogin(false)}
            >
              Sign up here
            </span>
          </p>
        </>
      ) : (
        <>
          <SignupForm closeModal={onClose} />
          <p style={{ marginTop: '10px' }}>
            Already have an account?{' '}
            <span
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => setIsLogin(true)}
            >
              Login here
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthModal;
