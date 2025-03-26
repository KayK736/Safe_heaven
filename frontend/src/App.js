import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/homex";
import RegisterPatient from "./pages/Kay/RegisterPatient";
import ViewPatients from "./pages/Kay/ViewPatients";
import Navbar from "./components/Navbar"; // ✅ Import the Navbar
import RegisterUser from "./pages/Kay/RegisterUser";
import Profile from "./pages/Kay/Profile";
import RegisterVolunteer from "./pages/Kay/RegisterVolunteer";
import ViewVolunteers from "./pages/Kay/ViewVolunteers";
import KayAdminLogin from "./pages/Kay/KayAdminLogin";
import KayAdminDashboard from "./pages/Kay/KayAdminDashboard";
import KayCaregiverRegister from "./pages/Kay/KayCaregiverRegister";
import KayCaregiverProfile from "./pages/Kay/KayCaregiverProfile";

//import KayPendingCaregivers from './pages/KayPendingCaregivers';
//import KayApprovedCaregivers from './pages/KayApprovedCaregivers';
//import "../src/pages/Styles/KayGlobal.css";
import KayLogin from "./pages/Kay/KayLogin";




const App = () => {
  return (
    <Router>
      <Navbar /> {/* ✅ Global Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-patient" element={<RegisterPatient />} />
        <Route path="/view-patients" element={<ViewPatients />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/register-volunteer" element={<RegisterVolunteer />} />
        <Route path="/view-volunteers" element={<ViewVolunteers />} />
        <Route path="/login" element={<KayLogin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/dashboard" element={<KayAdminDashboard />} />
        <Route path="/caregiver/register" element={<KayCaregiverRegister />} />
        {/*<Route path="/admin/pending-caregivers" element={<KayPendingCaregivers />} />
          <Route path="/admin/approved-caregivers" element={<KayApprovedCaregivers />} />*/}
        
        <Route path="/caregiver/profile" element={<KayCaregiverProfile />} />
        {/* Admin Routes */}
        <Route path="/kay-admin/login" element={<KayAdminLogin />} />
        <Route path="/kay-admin/dashboard" element={<KayAdminDashboard />} /> 
      </Routes>
    </Router>
  );
};

export default App;
