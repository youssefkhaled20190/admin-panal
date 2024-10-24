import React, { useState } from 'react';
import './style/LoginSignup.css'; // Include the CSS file
import Login from './authLogin.js'; // Import the Login component
import Signup from './authSignUp.js'; // Import the Signup component

const LoginSignup = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const toggleForm = () => {
    setIsSignUpActive(!isSignUpActive);
  };

 
  return (
    <div className={`container ${isSignUpActive ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <Login /> {/* Login Form */}
          <Signup /> {/* Signup Form */}
        </div>
      </div>

      

      {/* Panels for the sliding effect */}
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Sign up and discover new opportunities waiting for you.</p>
            <button className="btn transparent" onClick={toggleForm}>
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Sign in and continue where you left off.</p>
            <button className="btn transparent" onClick={toggleForm}>
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
