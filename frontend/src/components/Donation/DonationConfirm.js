import React from 'react';
import './DonationConfirm.css';

const DonationConfirm = ({ donationDetails }) => {
    return (
        <div className="confirmation-container">
            <div className="confirmation-card">
                <div className="checkmark">✓</div>
                <h2>Thank You for Your Donation!</h2>
                <p>Your donation of {donationDetails.amount} {donationDetails.currency} to {donationDetails.home.name} has been received.</p>
                <p>Transaction ID: {donationDetails.transactionId}</p>
                <p>Your donation is pending approval. You will receive an email confirmation once it's approved by our admin team.</p>
                <div className="status-pending">
                    Status: Pending Approval
                </div>
                <p className="note">
                    Note: You can cancel this donation within the next 12 hours by contacting our support team.
                </p>
            </div>
        </div>
    );
};

export default DonationConfirm;