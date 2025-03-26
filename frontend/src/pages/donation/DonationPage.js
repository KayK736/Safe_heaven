import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DonationContext } from '../../context/DonationContext';
import Donate from '../../components/Donation/Donate';

const DonatePage = () => {
    const { updateDonation } = useContext(DonationContext);
    const navigate = useNavigate();
    const { homeId } = useParams();

    // Mock data - replace with API call in real app
    const homeData = {
        id: homeId,
        name: "Elder's Care Home",
        patients: 30,
        totalDonations: 238615,
        currency: "USD",
        accountNumber: "1234567890",
        bankName: "Safe Heaven Bank",
        bankBranch: "Main Branch"
    };

    const handleNext = (donationData) => {
        updateDonation({
            ...donationData,
            home: homeData
        });
        navigate(`/homes/${homeId}/donate/payment`);
    };

    return <Donate home={homeData} onNext={handleNext} />;
};

export default DonatePage;