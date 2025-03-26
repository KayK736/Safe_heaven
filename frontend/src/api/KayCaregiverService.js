import axios from 'axios';

const API_URL = 'http://localhost:8079/api/caregivers';

// Set up axios instance with default headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerCaregiver = (caregiverData) => {
  return api.post('/register', caregiverData);
};

export const getAllCaregivers = () => {
  return api.get('/');
};

export const getApprovedCaregivers = () => {
  return api.get('/approved');
};

export const getPendingCaregivers = () => {
  return api.get('/pending');
};

export const getCaregiverById = (id) => {
  return api.get(`/${id}`);
};

export const updateCaregiver = (id, updateData) => {
  return api.put(`/${id}`, updateData);
};

export const approveCaregiver = (id, credentials) => {
  return api.put(`/approve/${id}`, credentials);
};

export const loginCaregiver = (credentials) => {
  return api.post('/login', credentials);
};

export const deleteCaregiver = (id) => {
  return api.delete(`/${id}`);
};

export const getCaregiverProfile = () => {
  return api.get('/profile');
};

// Export all functions as named exports
export default {
  registerCaregiver,
  getAllCaregivers,
  getApprovedCaregivers,
  getPendingCaregivers,
  getCaregiverById,
  updateCaregiver,
  approveCaregiver,
  loginCaregiver,
  deleteCaregiver,
  getCaregiverProfile
};