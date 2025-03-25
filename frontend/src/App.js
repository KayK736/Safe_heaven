import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { DonationProvider } from "./context/DonationContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CareHomes from "./pages/CareHomes";
import HomeDetails from "./pages/HomeDetails";
import RegisterPatient from "./pages/RegisterPatient";
import ViewPatients from "./pages/ViewPatients";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import Profile from "./pages/Profile";
import DonatePage from "./pages/donation/DonatePage";
import DonationPayment from "./pages/donation/PaymentPage";
import DonationConfirmation from "./pages/donation/ConfirmPage";
import AdminDashboard from "./pages/donation/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";

// Layout component for routes with navbar
const NavbarLayout = () => (
    <>
        <Navbar />
        <main className="main-content">
            <Outlet />
        </main>
    </>
);

// Layout component for routes without navbar
const NoNavbarLayout = () => (
    <main className="no-nav-content">
        <Outlet />
    </main>
);

const App = () => {
    return (
        <Router>
            <DonationProvider>
                <Routes>
                    {/* Routes WITH Navbar */}
                    <Route element={<NavbarLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/homes" element={<CareHomes />} />
                        <Route path="/homes/:homeId" element={<HomeDetails />} />
                        <Route path="/register-patient" element={<RegisterPatient />} />
                        <Route path="/view-patients" element={<ViewPatients />} />
                        <Route path="/register" element={<RegisterUser />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route
                            path="/admin/donations"
                            element={
                                <ProtectedRoute adminOnly={true}>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Route>

                    {/* Routes WITHOUT Navbar */}
                    <Route element={<NoNavbarLayout />}>
                        <Route path="/donate" element={<DonatePage />} />
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
                    </Route>

                    {/* Fallback Route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </DonationProvider>
        </Router>
    );
};

export default App;