import axios from 'axios';

const API_URL = 'http://localhost:8079/api/donations';

export const createDonation = async (donationData) => {
    const response = await axios.post(API_URL, donationData);
    return response.data;
};

export const getDonations = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const updateDonationStatus = async (id, status) => {
    const response = await axios.put(`${API_URL}/${id}`, { status });
    return response.data;
};