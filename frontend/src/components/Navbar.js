import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
    <div className="logo">SafeHeaven</div>
    <ul className="nav-links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About Us</Link></li>
      <li><Link to="/services">Services</Link></li>
      <li><Link to="/contact">Contact Us</Link></li>
      <li><Link to="/blog">Blog</Link></li>
    </ul>
    <div className="auth-buttons">
      <Link to="/login" className="login-btn">Login</Link>
      <Link to="/signup" className="signup-btn">Sign Up</Link>
    </div>
  </nav>
  );
};

 

export default Navbar;
