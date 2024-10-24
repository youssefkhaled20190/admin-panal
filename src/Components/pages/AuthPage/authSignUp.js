import React, { useState } from 'react';
import "./style/LoginSignup.css";
import axios from "axios";
import { useFormik } from "formik";

const Signup = () => {
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

    if (!values.FullName) {
      errors.FullName = "Required";
    } else if (values.FullName.length < 4) {
      errors.FullName = "The name must be above 4 chars";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
      FullName: ""
    },
    validate,
    onSubmit: async (values) => {
      try {
        // Making POST request
        const response = await axios({
          url: "https://localhost:7121/api/Authentication/register", // Corrected URL
          method: 'POST',
          data: {
            email: values.Email,
            password: values.Password,
            fullname: values.FullName
          },
        });

        if (response.status === 200) {
          setSuccess(true); // Registration successful
          setError(null);   // Clear any error messages
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed!');
        setSuccess(false);   // Show error message
      }
    },
  });

  return (
    <form className="sign-up-form" onSubmit={formik.handleSubmit}>
      <h2 className="title">Sign up</h2>
      
      {/* Email Input */}
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          name="Email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.Email}
        />
        {formik.errors.Email ? <div className="error">{formik.errors.Email}</div> : null}
      </div>
      
      {/* Password Input */}
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          name="Password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.Password}
        />
        {formik.errors.Password ? <div className="error">{formik.errors.Password}</div> : null}
      </div>

      {/* Full Name Input */}
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          name="FullName"
          placeholder="Full Name"
          onChange={formik.handleChange}
          value={formik.values.FullName}
        />
        {formik.errors.FullName ? <div className="error">{formik.errors.FullName}</div> : null}
      </div>

      {/* Submit Button */}
      <input type="submit" className="btn" value="Sign up" />

      {/* Success or Error Messages */}
      {success && <p className="success-text">Registration successful!</p>}
      {error && <p className="error-text">{error}</p>}

      <p className="social-text">Or Sign up with social platforms</p>
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

export default Signup;
