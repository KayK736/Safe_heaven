import { createContext, useState } from 'react';

export const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
    const [donation, setDonation] = useState({
        home: null,
        amount: 0,
        currency: 'USD',
        paymentDetails: null
    });

    const updateDonation = (data) => {
        setDonation(prev => ({ ...prev, ...data }));
    };

    return (
        <DonationContext.Provider value={{ donation, updateDonation }}>
            {children}
        </DonationContext.Provider>
    );
};
