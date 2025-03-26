import React from 'react';
import { Link } from 'react-router-dom';
import "../pages/Styles/Homex.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Navbar */}

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to Safe Heaven</h1>
          <p>Providing care and support for those in need</p>
        </div>
      </header>

      {/* Registration Sections */}
      <section className="registration-options">
        <div className="option">
          <h2>Patient Registration</h2>
          <p>Register new patients to our system to provide them with the care and support they need.</p>
          <Link to="/register-patient">Learn More →</Link>
        </div>
        <div className="option">
          <h2>Elder/Children Home Registration</h2>
          <p>Register new patients to our system to provide them with the care and support they need.</p>
          <Link to="/register-home">Learn More →</Link>
        </div>
        <div className="option">
          <h2>Volunteer Registration</h2>
          <p>Join our team of dedicated volunteers to help support those in need in our community.</p>
          <Link to="/register-volunteer">Learn More →</Link>
        </div>
        <div className="option">
          <h2>Donor Registration</h2>
          <p>Become a donor and help us continue our mission of providing care and support.</p>
          <Link to="/register">Learn More →</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
