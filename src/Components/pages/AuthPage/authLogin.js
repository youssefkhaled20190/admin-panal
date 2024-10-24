import { useState } from "react";
import React  from 'react';
import "./style/LoginSignup.css"
import axios from "axios";
import { useFormik } from "formik";
const Login = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");


  const validate = (values) => {
    const errors = {};
    if (!values.Email) {
      errors.Email = "Required";
    } else if (values.Email.length < 2) {
      errors.Email = "The Email must be above 2 chars";
    }

    if (!values.Password) {
      errors.Password = "Required";
    } else if (values.Password.length < 4) {
      errors.Password = "The Password must be above 4 chars";
    }

  

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
     
    },
    validate,
    onSubmit: async (values) => {
      try {
        // Making POST request
        const response = await axios({
          url: "https://localhost:7121/api/Authentication/login", // Corrected URL
          method: 'POST',
          data: {
            email: values.Email,
            password: values.Password,
           
          },
        });

        if (response.status === 200) {
          setSuccess(true); // Registration successful
          setError(null);   // Clear any error messages
          const { token, userId } = response.data; // Extract token and userId from response
          localStorage.setItem('token', token); // Store token in localStorage
          localStorage.setItem('userId', userId);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed!');
        setSuccess(false);   // Show error message
      }
    },
  });

  return (
    <form action="#" className="sign-in-form"  onSubmit={formik.handleSubmit}>
      <h2 className="title">Sign in</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input 
       type="text"
       name="Email"
       placeholder="Email"
       onChange={formik.handleChange}
       value={formik.values.Email}
        
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
         type="password"
         name="Password"
         placeholder="Password"
         onChange={formik.handleChange}
         value={formik.values.Password}
          
          />
      </div>
      <input type="submit" value="Login" className="btn solid" />
      <p className="social-text">Or Sign in with social platforms</p>
      <div className="social-media">
        <a href="#" className="social-icon">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="social-icon">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="social-icon">
          <i className="fab fa-google"></i>
        </a>
        <a href="#" className="social-icon">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </form>
  );
};

export default Login;
