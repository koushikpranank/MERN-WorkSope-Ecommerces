import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // Added index.css
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

import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/Login" element={<Login />} /> {/* Fixed duplicate path */}
        <Route path="/register" element={<Register />} />
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/user-profile" element={<Profile />} />
        {/* Catch-all route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
