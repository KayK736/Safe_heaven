// src/api.js
import axios from "axios";

const API_URL = "http://localhost:8079/api/payments"; // Replace with your backend URL

// Create a donation
export const createDonation = async (donationData) => {
    const response = await axios.post(`${API_URL}/donate`, donationData);
    return response.data;
};

// Get donations by user
export const getDonationsByUser = async (userId) => {
    const response = await axios.get(`${API_URL}/donations`, { params: { userId } });
    return response.data;
};

// Get all donations (admin)
export const getAllDonations = async () => {
    const response = await axios.get(`${API_URL}/admin/donations`);
    return response.data;
};

// Accept donation (admin)
export const acceptDonation = async (donationId) => {
    const response = await axios.put(`${API_URL}/admin/donations/${donationId}/accept`);
    return response.data;
};

// Reject donation (admin)
export const rejectDonation = async (donationId) => {
    const response = await axios.put(`${API_URL}/admin/donations/${donationId}/reject`);
    return response.data;
};

// Generate monthly report (admin)
export const generateReport = async () => {
    const response = await axios.get(`${API_URL}/admin/reports`);
    return response.data;
};