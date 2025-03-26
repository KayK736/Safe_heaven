import axios from 'axios';

const API_URL = 'http://localhost:8079/api/volunteers';

// Set up axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerVolunteer = (volunteerData) => {
  return api.post('/register', volunteerData);
};

export const getAllVolunteers = () => {
  return api.get('/');
};

export const getApprovedVolunteers = () => {
  return api.get('/approved');
};

export const getPendingVolunteers = () => {
  return api.get('/pending');
};

export const getVolunteerById = (id) => {
  return api.get(`/${id}`);
};

export const approveVolunteer = (id, credentials) => {
  return api.put(`/approve/${id}`, credentials);
};

export const deleteVolunteer = (id) => {
  return api.delete(`/${id}`);
};

export const getVolunteerProfile = () => {
  return api.get('/profile');
};

// Export all functions
export default {
  registerVolunteer,
  getAllVolunteers,
  getApprovedVolunteers,
  getPendingVolunteers,
  getVolunteerById,
  approveVolunteer,
  deleteVolunteer,
  getVolunteerProfile
};