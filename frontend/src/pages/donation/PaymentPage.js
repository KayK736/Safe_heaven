import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DonationContext } from '../../context/DonationContext';
import DonationPayment from '../../components/Donation/DonationPayment';

const PaymentPage = () => {
    const { donation, updateDonation } = useContext(DonationContext);
    const navigate = useNavigate();
    const { homeId } = useParams();

    const handleConfirm = (paymentData) => {
        updateDonation({ paymentDetails: paymentData });
        navigate(`/homes/${homeId}/donate/confirmation`);
    };

    const handleCancel = () => {
        navigate(`/homes/${homeId}`);
    };

    return (
        <DonationPayment
            donationDetails={donation}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        />
    );
};

export default PaymentPage;