import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/ViewVolunteers.css';

const ViewVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get('http://localhost:8079/api/volunteers');
        setVolunteers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch volunteers');
        setLoading(false);
        console.error('Error fetching volunteers:', err);
      }
    };

    fetchVolunteers();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="volunteers-container">
      <h2>Volunteers</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Category</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map(volunteer => (
            <tr key={volunteer._id}>
              <td>{volunteer.fullName}</td>
              <td>{volunteer.email}</td>
              <td>{volunteer.phone}</td>
              <td>{volunteer.category}</td>
              <td>{volunteer.availability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewVolunteers;