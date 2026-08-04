import React, { useState } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
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
  });

  // Controls whether we are asking for user details or the OTP
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!isOtpSent) {
        // STEP 1: Send OTP to the user's email
        // Make sure this matches your backend route for sending OTPs!
        await axios.post("http://localhost:5001/api/send-otp", {
          email: formData.email,
        });
        setIsOtpSent(true);
        alert("OTP sent to your email!");
      } else {
        // STEP 2: Verify OTP and Register
        const response = await axios.post(
          "http://localhost:5001/api/register",
          formData,
        );
        console.log("Registration Success:", response.data);
        alert("Registration successful!");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Action Failed:", errorMessage);
      alert("Failed: " + errorMessage);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-4 mb-5">
      <Card style={{ width: "40rem" }} className="p-4 shadow">
        <h3 className="text-center mb-4">Register</h3>
        <Form onSubmit={handleSubmit}>
          {/* Hide these fields if OTP is sent to keep the UI clean (Optional) */}
          {!isOtpSent && (
            <>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="secondName"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phoneNo"
                      maxLength="10"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
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
                  <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="user">User</option>
                      <option value="vendor">Vendor</option>
                      <option value="admin">Admin</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
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

          {/* Show OTP input only after Send OTP is clicked */}
          {isOtpSent && (
            <Form.Group className="mb-4 text-center">
              <Form.Label className="fw-bold">
                Enter OTP sent to {formData.email}
              </Form.Label>
              <Form.Control
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                required
                placeholder="Enter 5-digit OTP"
                className="text-center"
              />
            </Form.Group>
          )}

          <Button variant="dark" type="submit" className="w-100">
            {isOtpSent ? "Verify & Create Account" : "Send OTP"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
