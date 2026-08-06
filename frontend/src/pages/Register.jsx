import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Card,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../assets/css/register.css";

const Register = () => {
  const initialFormState = {
    firstName: "",
    secondName: "",
    email: "",
    password: "",
    phoneNo: "",
    gender: "male",
    state: "",
    address: "NA",
    role: "user",
    otp: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!isOtpSent) {
        await axios.post("http://localhost:5001/api/send-otp", {
          email: formData.email,
        });
        setIsOtpSent(true);
        toast.success("OTP sent to your email!");
      } else {
        const response = await axios.post(
          "http://localhost:5001/api/register",
          formData,
        );
        console.log("Registration Success:", response.data);

        // Save token if returned on register, then head to main page
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        toast.success("Registration successful!");

        setFormData(initialFormState);
        setIsOtpSent(false);

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Action Failed:", errorMessage);
      toast.error("Failed: " + errorMessage);
    }
  };

  return (
    <Container fluid className="register-container">
      <Card className="register-card">
        <h3 className="register-title">Register</h3>
        <Form onSubmit={handleSubmit}>
          {!isOtpSent && (
            <>
              <Row>
                <Col md={6}>
                  <Form.Group className="register-form-group">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="register-form-group">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="secondName"
                      value={formData.secondName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="register-form-group">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="register-form-group">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phoneNo"
                      maxLength="10"
                      value={formData.phoneNo}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="register-form-group">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <InputGroup.Text
                        onClick={() => setShowPassword(!showPassword)}
                        className="password-eye-icon"
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-eye"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-eye-slash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                          </svg>
                        )}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="register-form-group">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="register-form-group">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="register-form-group">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="user">User</option>
                      <option value="vendor">Vendor</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="register-form-group mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </>
          )}

          {isOtpSent && (
            <Form.Group
              className="register-form-group"
              style={{ textAlign: "center", marginBottom: "1.5rem" }}
            >
              <Form.Label style={{ fontSize: "1.1rem" }}>
                Enter OTP sent to {formData.email}
              </Form.Label>
              <Form.Control
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                required
                placeholder="Enter 5-digit OTP"
                style={{ textAlign: "center" }}
              />
            </Form.Group>
          )}

          <Button
            variant="dark"
            type="submit"
            className="register-button w-100 mb-3"
          >
            {isOtpSent ? "Verify & Create Account" : "Send OTP"}
          </Button>

          <div className="text-center">
            <span className="text-muted">Already have an account? </span>
            <Link to="/login" className="text-decoration-none fw-bold">
              Login
            </Link>
          </div>
        </Form>
      </Card>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default Register;
