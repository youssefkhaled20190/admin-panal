import { useState } from "react";
import React from "react";
import "./style/LoginSignup.css";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (values.email.length < 2) {
      errors.email = "The Email must be above 2 chars";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 4) {
      errors.password = "The Password must be above 4 chars";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        // Making POST request
        const response = await axios.post("https://localhost:7121/api/Authentication/login", {
          email: values.email,
          password: values.password,
        });

        if (response.status === 200) {
          setSuccess(true); // Login successful
          setError(""); // Clear any error messages
          const { token, userId } = response.data; // Extract token and userId from response
          localStorage.setItem("token", token); // Store token in localStorage
          localStorage.setItem("userId", userId);
          navigate("/"); // Navigate to home
        }
      } catch (err) {
        setError(err.response?.data?.message || "Login failed!");
        setSuccess(false); // Show error message
      }
    },
  });

  return (
    <form className="auth-form sign-in-form" onSubmit={formik.handleSubmit}>
      <h2 className="title">Sign in</h2>

      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
      </div>

      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
      </div>

      <input type="submit" value="Login" className="btn solid" />

      {error && <div className="error-message">{error}</div>}

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
