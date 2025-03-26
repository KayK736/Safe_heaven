import React, { useEffect, useState } from 'react';
import KaySidebar from '../components/KaySidebar';
import KayCaregiverCard from '../components/KayCaregiverCard';
import { getPendingCaregivers, approveCaregiver, deleteCaregiver } from '../services/KayCaregiverService';
import '../styles/KayAdmin.css';

const KayPendingCaregivers = () => {
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        const response = await getPendingCaregivers();
        setCaregivers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch pending caregivers');
        setLoading(false);
        console.error(err);
      }
    };
    fetchCaregivers();
  }, []);

  const handleApprove = async (id) => {
    try {
      const username = `caregiver_${id.slice(0, 5)}`;
      const password = `TempPass${id.slice(0, 3)}!`;
      
      await approveCaregiver(id, { username, password });
      setCaregivers(caregivers.filter(c => c._id !== id));
      alert(`Caregiver approved! Credentials: ${username}/${password}`);
    } catch (err) {
      setError('Failed to approve caregiver');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this caregiver request?')) {
      try {
        await deleteCaregiver(id);
        setCaregivers(caregivers.filter(c => c._id !== id));
      } catch (err) {
        setError('Failed to delete caregiver');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="kay-loading">Loading...</div>;
  if (error) return <div className="kay-error">{error}</div>;

  return (
    <div className="kay-admin-container">
      <KaySidebar />
      <div className="kay-admin-content">
        <h1>Pending Caregiver Applications</h1>
        <div className="kay-caregiver-grid">
          {caregivers.length > 0 ? (
            caregivers.map(caregiver => (
              <KayCaregiverCard
                key={caregiver._id}
                caregiver={caregiver}
                showActions={true}
                onApprove={() => handleApprove(caregiver._id)}
                onDelete={() => handleDelete(caregiver._id)}
              />
            ))
          ) : (
            <p>No pending caregiver applications</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KayPendingCaregivers;