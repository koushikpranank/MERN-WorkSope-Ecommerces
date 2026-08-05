import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// User Pages
import Home from "./pages/users/Home";
import About from "./pages/users/About";
import Cart from "./pages/users/Cart";
import Products from "./pages/users/Products";
import Profile from "./pages/users/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
