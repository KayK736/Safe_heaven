import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { DonationProvider } from "./context/DonationContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CareHomes from "./pages/CareHomes"; // New component
import HomeDetails from "./pages/HomeDetails"; // New component
import RegisterPatient from "./pages/RegisterPatient";
import ViewPatients from "./pages/ViewPatients";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import Profile from "./pages/Profile";
import DonationHome from "./pages/donation/DonatePage";
import DonationPayment from "./pages/donation/PaymentPage";
import DonationConfirmation from "./pages/donation/ConfirmPage";
import AdminDashboard from "./pages/donation/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
    return (
        <Router>
            <DonationProvider>
                <Navbar />
                <main className="main-content">
                    <Routes>
                        {/* Core Application Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/homes" element={<CareHomes />} />
                        <Route path="/homes/:homeId" element={<HomeDetails />} />

                        {/* Donation Flow Routes */}
                        <Route path="/homes/:homeId/donate" element={<DonationHome />} />
                        <Route
                            path="/homes/:homeId/donate/payment"
                            element={
                                <ProtectedRoute>
                                    <DonationPayment />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/homes/:homeId/donate/confirmation"
                            element={
                                <ProtectedRoute>
                                    <DonationConfirmation />
                                </ProtectedRoute>
                            }
                        />

                        {/* Patient Management Routes */}
                        <Route path="/register-patient" element={<RegisterPatient />} />
                        <Route path="/view-patients" element={<ViewPatients />} />

                        {/* User Account Routes */}
                        <Route path="/register" element={<RegisterUser />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />

                        {/* Admin Routes */}
                        <Route
                            path="/admin/donations"
                            element={
                                <ProtectedRoute adminOnly={true}>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />

                        {/* Fallback Route */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </DonationProvider>
        </Router>
    );
};

export default App;