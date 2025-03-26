import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDonation from '../../components/Donation/AdminDonation';

const AdminPage = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate API call
        const fetchDonations = async () => {
            try {
                // Replace with actual API call
                const mockDonations = [
                    {
                        id: '1',
                        donorName: 'John Doe',
                        amount: 100,
                        currency: 'USD',
                        date: '2023-10-01',
                        homeName: 'Sumatine Elder Care',
                        status: 'Pending',
                        transactionId: 'TXN123456'
                    },
                    // ... more mock data
                ];
                setDonations(mockDonations);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching donations:', error);
                setLoading(false);
            }
        };

        fetchDonations();
    }, []);

    const handleStatusChange = (id, newStatus) => {
        setDonations(donations.map(donation =>
            donation.id === id ? { ...donation, status: newStatus } : donation
        ));
        // In real app, you would also update the backend here
    };

    const handleGenerateReport = () => {
        // Implement report generation logic
        navigate('/admin/reports');
    };

    return (
        <AdminDonation
            donations={donations}
            loading={loading}
            onStatusChange={handleStatusChange}
            onGenerateReport={handleGenerateReport}
        />
    );
};

export default AdminPage;