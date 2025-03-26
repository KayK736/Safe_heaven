import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import "../styles/KayCaregiver.css";

const KayCaregiverRegister = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    nicNumber: "",
    phone: "",
    address: "",
    availability: "",
    experienceYears: 0,
    medicalSkills: [],
    acceptTerms: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8079/api/caregivers/register", formData);
      alert("Registration submitted! Await admin approval.");
      navigate("/");
    } catch (err) {
      setError("Registration failed. Please check your inputs.");
    }
  };

  return (
    <div className="kay-register-container">
      <h2>Caregiver Registration</h2>
      {error && <p className="kay-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
        />
        {/* Add other fields similarly */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default KayCaregiverRegister;