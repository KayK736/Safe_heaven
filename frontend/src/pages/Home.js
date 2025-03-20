import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Safe Heaven</h1>
      <p style={styles.subtext}>Providing care and support for those in need.</p>

      <nav style={styles.navbar}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/register-patient" style={styles.link}>Register Patient</Link>
        <Link to="/view-patients" style={styles.link}>View Patients</Link>
        <Link to="/register" style={styles.link}>Register</Link>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
      </nav>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#f4f4f9",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "2.5rem",
    color: "#333",
  },
  subtext: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "20px",
  },
  navbar: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "20px",
  },
  link: {
    textDecoration: "none",
    color: "white",
    backgroundColor: "#007bff",
    padding: "10px 15px",
    borderRadius: "5px",
    fontWeight: "bold",
  },
};

export default Home;
