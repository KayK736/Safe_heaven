import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/RegisterVolunteer.css';

const RegisterVolunteer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    nicNumber: '',
    phone: '',
    address: '',
    availability: '',
    category: '',
    teachingSubjects: '',
    medicalServices: '',
    otherService: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.nicNumber.trim()) newErrors.nicNumber = 'NIC number is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.availability) newErrors.availability = 'Availability is required';
    if (!formData.category) newErrors.category = 'Category is required';
    
    // Conditional validations
    if (formData.category === 'Teaching' && !formData.teachingSubjects.trim()) {
      newErrors.teachingSubjects = 'Teaching subjects are required';
    }
    if (formData.category === 'Medical services' && !formData.medicalServices.trim()) {
      newErrors.medicalServices = 'Medical services are required';
    }
    if (formData.category === 'Other' && !formData.otherService.trim()) {
      newErrors.otherService = 'Other service is required';
    }
    
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post('http://localhost:8079/api/volunteers/register', formData);
      if (response.status === 201) {
        alert('Volunteer registration successful!');
        navigate('/');
      }
    } catch (error) {
      setServerError(error.response?.data?.error || 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="register-volunteer-container">
      <h2>Volunteer Registration</h2>
      {serverError && <div className="error-message">{serverError}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>NIC Number</label>
          <input
            type="text"
            name="nicNumber"
            value={formData.nicNumber}
            onChange={handleChange}
          />
          {errors.nicNumber && <span className="error">{errors.nicNumber}</span>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        <div className="form-group">
          <label>Availability</label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
          >
            <option value="">Select availability</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Weekends">Weekends only</option>
            <option value="Evenings">Evenings only</option>
          </select>
          {errors.availability && <span className="error">{errors.availability}</span>}
        </div>

        <div className="form-group">
          <label>Volunteer Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            <option value="Teaching">Teaching</option>
            <option value="Medical services">Medical services</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
        </div>

        {formData.category === 'Teaching' && (
          <div className="form-group">
            <label>Teaching Subjects</label>
            <input
              type="text"
              name="teachingSubjects"
              value={formData.teachingSubjects}
              onChange={handleChange}
              placeholder="e.g., Mathematics, Science"
            />
            {errors.teachingSubjects && <span className="error">{errors.teachingSubjects}</span>}
          </div>
        )}

        {formData.category === 'Medical services' && (
          <div className="form-group">
            <label>Medical Services</label>
            <input
              type="text"
              name="medicalServices"
              value={formData.medicalServices}
              onChange={handleChange}
              placeholder="e.g., Nursing, Physiotherapy"
            />
            {errors.medicalServices && <span className="error">{errors.medicalServices}</span>}
          </div>
        )}

        {formData.category === 'Other' && (
          <div className="form-group">
            <label>Other Service</label>
            <input
              type="text"
              name="otherService"
              value={formData.otherService}
              onChange={handleChange}
              placeholder="Describe your service"
            />
            {errors.otherService && <span className="error">{errors.otherService}</span>}
          </div>
        )}

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
          />
          <label>I accept the terms and conditions</label>
          {errors.acceptTerms && <span className="error">{errors.acceptTerms}</span>}
        </div>

        <button type="submit" className="submit-btn">Register as Volunteer</button>
      </form>
    </div>
  );
};

export default RegisterVolunteer;