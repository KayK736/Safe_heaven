import React, { useEffect, useState } from "react";
import axios from "axios";
//import "../styles/KayCaregiver.css";

const KayCaregiverProfile = () => {
  const [caregiver, setCaregiver] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8079/api/caregivers/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCaregiver(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  if (!caregiver) return <p>Loading...</p>;

  return (
    <div className="kay-profile-container">
      <h1>Your Profile</h1>
      <div className="kay-profile-details">
        <p><strong>Name:</strong> {caregiver.fullName}</p>
        <p><strong>Email:</strong> {caregiver.email}</p>
        <p><strong>Status:</strong> {caregiver.isApproved ? "Approved" : "Pending"}</p>
      </div>
    </div>
  );
};

export default KayCaregiverProfile;