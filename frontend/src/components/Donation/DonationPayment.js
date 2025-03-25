import React, { useState } from 'react';
import './DonationPayment.css';

const DonationPayment = ({ donationDetails, onBack, onConfirm, onCancel }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [errors, setErrors] = useState({});

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join('-');
        }
        return value;
    };

    const handleCardNumberChange = (e) => {
        const formatted = formatCardNumber(e.target.value);
        setCardNumber(formatted);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!cardNumber || cardNumber.replace(/-/g, '').length !== 16) {
            newErrors.cardNumber = 'Please enter a valid 16-digit card number';
        }

        if (!cardName) {
            newErrors.cardName = 'Card holder name is required';
        }

        if (!expiry || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiry)) {
            newErrors.expiry = 'Please enter a valid expiry date (MM/YY)';
        }

        if (!cvc || cvc.length !== 3 || !/^\d+$/.test(cvc)) {
            newErrors.cvc = 'Please enter a valid 3-digit CVC';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onConfirm({
                cardNumber,
                cardName,
                expiry,
                cvc
            });
        }
    };

    return (
        <div className="payment-container">
            <h2>Payment Details</h2>

            <div className="donation-summary">
                <h3>Donation Summary</h3>
                <p>Amount: {donationDetails.amount} {donationDetails.currency}</p>
                <p>Recipient: {donationDetails.home.name}</p>
                <p>Account Number: {donationDetails.home.accountNumber}</p>
                <p>Bank: {donationDetails.home.bankName}</p>
                <p>Branch: {donationDetails.home.bankBranch}</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Card Number</label>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234-5678-9012-3456"
                        maxLength="19"
                    />
                    {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
                </div>

                <div className="form-group">
                    <label>Card Holder Name</label>
                    <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                    />
                    {errors.cardName && <span className="error">{errors.cardName}</span>}
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Expiry Date (MM/YY)</label>
                        <input
                            type="text"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            placeholder="MM/YY"
                            maxLength="5"
                        />
                        {errors.expiry && <span className="error">{errors.expiry}</span>}
                    </div>

                    <div className="form-group">
                        <label>CVC</label>
                        <input
                            type="text"
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="123"
                            maxLength="3"
                        />
                        {errors.cvc && <span className="error">{errors.cvc}</span>}
                    </div>
                </div>

                <div className="button-group">
                    <button type="button" className="cancel-button" onClick={onCancel}>
                        Cancel Donation
                    </button>
                    <button type="submit" className="pay-button">
                        Pay Now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DonationPayment;