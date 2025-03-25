import React, { useState, useEffect } from 'react';
import './AdminDonation.css';

const AdminDonation = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        const fetchDonations = async () => {
            try {
                // In a real app, you would fetch from your API
                const mockDonations = [
                    {
                        id: '1',
                        donorName: 'John Doe',
                        amount: 100,
                        currency: 'USD',
                        date: '2023-10-01',
                        homeName: 'Sumatine Elder Care',
                        status: 'Received',
                        transactionId: 'TXN123456'
                    },
                    {
                        id: '2',
                        donorName: 'Jane Smith',
                        amount: 50,
                        currency: 'USD',
                        date: '2023-10-05',
                        homeName: 'Little Stars Home',
                        status: 'Pending',
                        transactionId: 'TXN789012'
                    },
                    {
                        id: '3',
                        donorName: 'Alice Johnson',
                        amount: 200,
                        currency: 'USD',
                        date: '2023-10-10',
                        homeName: 'Golden Yeats Haven',
                        status: 'Received',
                        transactionId: 'TXN345678'
                    }
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

    const handleAccept = (id) => {
        setDonations(donations.map(donation =>
            donation.id === id ? { ...donation, status: 'Accepted' } : donation
        ));
    };

    const handleReject = (id) => {
        setDonations(donations.map(donation =>
            donation.id === id ? { ...donation, status: 'Rejected' } : donation
        ));
    };

    const handleRefund = (id) => {
        setDonations(donations.map(donation =>
            donation.id === id ? { ...donation, status: 'Refunded' } : donation
        ));
    };

    return (
        <div className="admin-donation-container">
            <h1>Donation Management</h1>

            <div className="report-section">
                <button className="generate-report-btn">Generate Monthly Report</button>
            </div>

            {loading ? (
                <p>Loading donations...</p>
            ) : (
                <div className="donation-table-container">
                    <table className="donation-table">
                        <thead>
                        <tr>
                            <th>Donor Name</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Home</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {donations.map((donation) => (
                            <tr key={donation.id}>
                                <td>{donation.donorName}</td>
                                <td>{donation.amount} {donation.currency}</td>
                                <td>{donation.date}</td>
                                <td>{donation.homeName}</td>
                                <td>
                    <span className={`status-badge ${donation.status.toLowerCase()}`}>
                      {donation.status}
                    </span>
                                </td>
                                <td>
                                    {donation.status === 'Pending' && (
                                        <>
                                            <button
                                                className="action-btn accept-btn"
                                                onClick={() => handleAccept(donation.id)}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="action-btn reject-btn"
                                                onClick={() => handleReject(donation.id)}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    {donation.status === 'Accepted' && (
                                        <button
                                            className="action-btn refund-btn"
                                            onClick={() => handleRefund(donation.id)}
                                        >
                                            Refund
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDonation;