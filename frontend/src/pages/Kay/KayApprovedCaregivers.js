import React, { useEffect, useState } from 'react';
import KaySidebar from '../components/KaySidebar';
import KayCaregiverCard from '../components/KayCaregiverCard';
import { getApprovedCaregivers, deleteCaregiver } from '../services/KayCaregiverService';
import '../styles/KayAdmin.css';

const KayApprovedCaregivers = () => {
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        const response = await getApprovedCaregivers();
        setCaregivers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch approved caregivers');
        setLoading(false);
        console.error(err);
      }
    };
    fetchCaregivers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this caregiver?')) {
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
        <h1>Approved Caregivers</h1>
        <div className="kay-caregiver-grid">
          {caregivers.length > 0 ? (
            caregivers.map(caregiver => (
              <KayCaregiverCard
                key={caregiver._id}
                caregiver={caregiver}
                showActions={true}
                onDelete={() => handleDelete(caregiver._id)}
              />
            ))
          ) : (
            <p>No approved caregivers</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KayApprovedCaregivers;