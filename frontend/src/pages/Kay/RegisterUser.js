import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    nic: "",
    email: "",
    address: "",
    password: "",
    role: "Donor",
    profilePic: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData({ ...formData, profilePic: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    console.log("Form Data Sent:", formDataObj);

    try {
      await axios.post("http://localhost:8079/api/users/register", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response ? error.response.data : error.message);
      alert(`Registration failed: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
        <input type="text" name="nic" placeholder="NIC" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange} required>
          <option value="Donor">Donor</option>
          <option value="Service Buyer">Service Buyer</option>
          <option value="Both">Both</option>
        </select>
        <input type="file" name="profilePic" onChange={handleFileChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterUser;
