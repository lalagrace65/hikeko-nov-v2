import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import JoinerDetailsForm from '@/components/forms/JoinerDetailsForm';
import { Typography } from '@material-tailwind/react';



function CustomerPackageDetails() {
    const { packageId } = useParams(); // Get package ID from the URL
    const [packageDetail, setPackageDetail] = useState(null);

    useEffect(() => {
        const fetchPackageDetail = async () => {
            try {
                const response = await axios.get(`/api/packages/${packageId}`);
                setPackageDetail(response.data);
            } catch (error) {
                console.error('Error fetching package details:', error);
            }
        };
        fetchPackageDetail();
    }, [packageId]);

    if (!packageDetail) return <p>Loading...</p>;

    return (
        <>
        <div className="p-4">
            <h1 className="text-3xl font-bold"></h1>
            <Typography variant="h1">
                You are Booking to: {packageDetail.travelAgency.name}
            </Typography>
            <p>Price: {packageDetail.price}</p>
            <p>Payment Options: {packageDetail.paymentOptions}</p>
            <p>Extra Info: {packageDetail.extraInfo}</p>
            <p>Max Guests: {packageDetail.maxGuests}</p>
            {/* Add more package details as needed */}
        </div>
        <JoinerDetailsForm packageId={packageId} />
        </>
    );
}

export default CustomerPackageDetails;
