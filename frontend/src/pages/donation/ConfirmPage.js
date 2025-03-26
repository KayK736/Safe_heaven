import { useContext } from 'react';
import { DonationContext } from '../../context/DonationContext';
import DonationConfirm from '../../components/Donation/DonationConfirm';

const ConfirmPage = () => {
    const { donation } = useContext(DonationContext);

    // Generate mock transaction ID
    const transactionId = `TXN-${Math.floor(Math.random() * 1000000)}`;
    const donationWithId = {
        ...donation,
        transactionId,
        status: "Pending Approval"
    };

    return <DonationConfirm donationDetails={donationWithId} />;
};

export default ConfirmPage;