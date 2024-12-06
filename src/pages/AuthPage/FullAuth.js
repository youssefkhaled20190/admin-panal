import React, { useState } from "react";
import { useFormik } from "formik";
import "./style/LoginSignup.css";

import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Row,
  Col,
  Form,
  CardTitle,
  Label,
  FormGroup,
  Container,
  CardImg,
  Alert,
} from "reactstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
// import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FaFacebook } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import dashboard from "../../Assets/imgs/5209158.jpg"

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateLogin = (values) => {
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

  const validateRegister = (values) => {
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

    if (!values.fullname) {
      errors.fullname = "Required";
    }

    return errors;
  };

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateLogin,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://localhost:7121/api/Authentication/login",
          {
            email: values.email,
            password: values.password,
          }
        );

        if (response.status === 200) {
          setSuccess(true);
          setError("");
          const { token, userId } = response.data;
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
          navigate("/");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Login failed!");
        setSuccess(false);
      }
    },
  });

  const registerFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullname: "",
    },
    validate: validateRegister,
    onSubmit: async (values) => {
      try {
        // Making POST request
        const response = await axios({
          url: "https://localhost:7121/api/Authentication/register", // Corrected URL
          method: "POST",
          data: {
            email: values.email,
            password: values.password,
            fullname: values.fullname,
          },
        });

        if (response.status === 200) {
          setSuccess(true); // Registration successful
          setError(null); // Clear any error messages
        }
      } catch (err) {
        setError(err.response?.data?.message || "Registration failed!");
        setSuccess(false); // Show error message
      }
    },
  });

  return (
    <>
      <div className="background">
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1
                style={{
                  fontSize: "96px",
                  marginBottom: "56px",
                  marginRight: "185px",
                  color: "white",
                }}
              >
                Welcome Back
              </h1>
              {/* <img
                src="/assets/49390-middle-removebg-preview.png"
                alt="Logo"
                style={{
                  width: "100px",
                  marginRight: "20px",
                  marginBottom: "44px",
                }}
              /> */}
            </div>
            <h2
              style={{
                fontSize: "25px",
                
                marginBottom: "117px",
                color: "rgb(24 36 69)",
              }}
            >
              {isRegistering
                ? "Join us today and start your journey towards a smarter shopping experience!"
                : "Streamline. Monitor. Succeed."}
            </h2>
          </div>
          <Row className="justify-content-center">
            <Col xs={12} sm={12} md={12}>
              <Card
                style={{
                  width: "400px",
                  backgroundColor: "rgb(255 255 255)",
                  border: "none",
                  padding: "10px",
                }}
              >
                <CardImg top src={dashboard} />
                <CardBody>
                  <Form
                    onSubmit={
                      isRegistering
                        ? registerFormik.handleSubmit
                        : loginFormik.handleSubmit
                    }
                  >
                    <Col>
                      <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                        <Input
                          id="email"
                          name="email"
                          placeholder="Username or Email"
                          type="text"
                          onChange={
                            isRegistering
                              ? registerFormik.handleChange
                              : loginFormik.handleChange
                          }
                          value={
                            isRegistering
                              ? registerFormik.values.email
                              : loginFormik.values.email
                          }
                        />
                      </FormGroup>
                      {isRegistering && registerFormik.errors.email && (
                        <div style={{ color: "red" }}>
                          {registerFormik.errors.email}
                        </div>
                      )}
                      {!isRegistering && loginFormik.errors.email && (
                        <div style={{ color: "red" }}>
                          {loginFormik.errors.email}
                        </div>
                      )}

                      <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                        <Input
                          id="password"
                          name="password"
                          placeholder="Password"
                          type="password"
                          onChange={
                            isRegistering
                              ? registerFormik.handleChange
                              : loginFormik.handleChange
                          }
                          value={
                            isRegistering
                              ? registerFormik.values.password
                              : loginFormik.values.password
                          }
                        />
                      </FormGroup>
                      {isRegistering && registerFormik.errors.password && (
                        <div style={{ color: "red" }}>
                          {registerFormik.errors.password}
                        </div>
                      )}
                      {!isRegistering && loginFormik.errors.password && (
                        <div style={{ color: "red" }}>
                          {loginFormik.errors.password}
                        </div>
                      )}

                      {isRegistering && (
                        <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                          <Input
                            id="fullname"
                            name="fullname"
                            placeholder="Full Name"
                            type="text"
                            onChange={registerFormik.handleChange}
                            value={registerFormik.values.fullname}
                          />
                        </FormGroup>
                      )}
                      {isRegistering && registerFormik.errors.fullname && (
                        <div style={{ color: "red" }}>
                          {registerFormik.errors.fullname}
                        </div>
                      )}
                    </Col>
                    <Container>
                      <Row>
                        <Col className="d-flex justify-content-center">
                          <Button
                            type="submit"
                            style={{
                              width: "100px",
                              color: "white",
                              backgroundColor: "orange",
                            }}
                          >
                            Submit
                            <span style={{ marginLeft: "5px" }}>
                              <FaArrowRight />
                            </span>
                          </Button>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col className="d-flex justify-content-center">
                          <FaInstagram  color="orange" style={{height:"30px" , width:"30px"}}/>
                          <FaFacebook color="orange" style={{height:"30px" , width:"30px"}}/>
                          <FaTwitterSquare color="orange" style={{height:"30px" , width:"30px"}} />
                        </Col>
                      </Row>
                    </Container>
                  </Form>
                  {/* <div className="text-center mt-3">
                    {isRegistering ? (
                      <Button
                        onClick={() => setIsRegistering(false)}
                        style={{ width: "100%" }}
                      >
                        Already have an account? Log In
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setIsRegistering(true)}
                        style={{ width: "100%" }}
                      >
                        Don't have an account? Register
                      </Button>
                    )}
                  </div> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Auth;
