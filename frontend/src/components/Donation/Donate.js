import React, { useState, useEffect } from 'react';
import './Donate.css';

const Donate = ({ home, onNext }) => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            setError('Please enter a valid donation amount');
            return;
        }
        onNext({ amount, currency });
    };

    return (
        <div className="donate-container">
            <h2>Donate to {home.name}</h2>
            <div className="home-stats">
                <p>Current Patients: {home.patients}</p>
                <p>Donations Received: {home.totalDonations} {home.currency}</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Select Currency:</label>
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        required
                    >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="LKR">LKR (Rs)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Donation Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="1"
                        step="0.01"
                        required
                    />
                </div>

                {error && <p className="error">{error}</p>}

                <button type="submit" className="donate-button">
                    Continue to Payment
                </button>
            </form>
        </div>
    );
};

export default Donate;