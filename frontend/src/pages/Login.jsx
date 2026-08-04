import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import axios from "axios";
import "../assets/css/login.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5001/api/login",
        formData,
      );
      console.log("Login Success! Token:", response.data.token);
      alert("Login successful!");
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Login Failed:", errorMessage);
      alert("Login failed: " + errorMessage);
    }
  };

  return (
    <Container className="login-container">
      <Card className="login-card">
        <h3 className="login-title">Login</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="login-form-group">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="username"
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="login-form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="dark" type="submit" className="login-button">
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
