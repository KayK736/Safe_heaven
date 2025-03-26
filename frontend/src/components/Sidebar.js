import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  return (
    <div style={{
      width: '250px',
      height: '100vh',
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '20px',
      boxSizing: 'border-box',
      position: 'fixed',
      left: 0,
      top: 0
    }}>
      <h3 style={{
        marginBottom: '30px',
        paddingBottom: '15px',
        borderBottom: '1px solid #34495e',
        fontSize: '1.3rem'
      }}>Admin Panel</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Link 
          to="/admin/dashboard" 
          style={{
            color: 'white',
            textDecoration: 'none',
            padding: '10px 15px',
            borderRadius: '4px',
            transition: 'background-color 0.3s',
            ':hover': { backgroundColor: '#3498db' }
          }}
        >
          Dashboard
        </Link>
        
        <Link 
          to="/admin/all-caregivers" 
          style={{
            color: 'white',
            textDecoration: 'none',
            padding: '10px 15px',
            borderRadius: '4px',
            transition: 'background-color 0.3s',
            ':hover': { backgroundColor: '#3498db' }
          }}
        >
          Caregivers
        </Link>
        
        <Link 
          to="/admin/all-volunteers" 
          style={{
            color: 'white',
            textDecoration: 'none',
            padding: '10px 15px',
            borderRadius: '4px',
            transition: 'background-color 0.3s',
            ':hover': { backgroundColor: '#3498db' }
          }}
        >
          Volunteers
        </Link>
        
        <Link 
          to="/admin/notifications" 
          style={{
            color: 'white',
            textDecoration: 'none',
            padding: '10px 15px',
            borderRadius: '4px',
            transition: 'background-color 0.3s',
            ':hover': { backgroundColor: '#3498db' }
          }}
        >
          Notifications
        </Link>
        
        <button 
          onClick={handleLogout}
          style={{
            marginTop: '20px',
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            ':hover': { backgroundColor: '#c0392b' }
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;