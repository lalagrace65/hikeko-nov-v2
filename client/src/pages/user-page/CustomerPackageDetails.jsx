import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import JoinerDetailsForm from '@/components/forms/JoinerDetailsForm';
import { Typography } from '@material-tailwind/react';
import { baseUrl } from '@/Url';
import { Carousel } from "@material-tailwind/react";
import { IoArrowBackCircleOutline } from "react-icons/io5";

function CustomerPackageDetails() {
    const navigate = useNavigate();
    const { packageId } = useParams(); // Get package ID from the URL
    const [packageDetail, setPackageDetail] = useState(null);

    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const fetchPackageDetail = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/packages/${packageId}`);
                setPackageDetail(response.data);
            } catch (error) {
                console.error('Error fetching package details:', error);
            }
        };
        fetchPackageDetail();
    }, [packageId,]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    // Helper function to format time (hours and minutes) to 12-hour format
    const formatTime = (hours, minutes) => {
        if (hours == null || minutes == null) return "N/A";

        // Convert hours to 12-hour format
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedHours}:${formattedMinutes} ${period}`;
    };

    function formatCurrency(amount, currency = 'PHP') {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency,
        }).format(amount);
    }  

    // Function to format both checkIn and checkOut times
    const formatBookingTime = (checkIn, checkOut) => {
        const formattedCheckIn = formatTime(checkIn?.hours, checkIn?.minutes);
        const formattedCheckOut = formatTime(checkOut?.hours, checkOut?.minutes);

        return `${formattedCheckIn} - ${formattedCheckOut}`;
    };

    const packageNames = {
        vanTransfer: 'Van Transfer',
        registrationFee: 'Registration Fee',
        coordinatorFee: "Coordinator's Fee",
        tourGuideFee: 'Tour Guide Fee',
        environmentalFee: 'Environmental Fee',
        parkingFee: 'Parking Fee',
        bagTag: 'Bag Tag',
        driverFee: "Driver's Fee",
        droneService: 'Drone Shot Service',
    }; 


    if (!packageDetail) return <p>Loading...</p>;

    return (
        <div>
            <div className="flex items-center px-4 md:px-6 lg:px-60 space-x-2 flex-row  mt-5 " onClick={handleBack}>
                <IoArrowBackCircleOutline className='text-4xl text-primary cursor-pointer'/>
                <div className='flex text-primary font-semibold text-xl cursor-pointer' >
                    Back
                </div>
            </div>
            {/* First Section: Details and Carousel in 2 Columns */}
            <div className="px-4 md:px-6 lg:px-60 grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
                {/* Left Side: Package Details */}
                <div className="space-y-4">
                    <Typography variant="h2" className='mt-2'>{packageDetail.trailId.title}</Typography>
                    <Typography variant="h2" className="flex items-center space-x-3">
                        You are Booking to: 
                        <div className="flex items-center space-x-3">
                            {packageDetail.travelAgency?.avatar? (
                                <img
                                    src={packageDetail.travelAgency.avatar}
                                    alt={`${packageDetail.travelAgency.name} Logo`}
                                    className="ml-2 w-12 h-12 object-cover rounded-full"
                                />
                            ) : (
                                <div className="w-12 h-12 bg-gray-200 rounded-full" /> // Placeholder for logo if none exists
                            )}
                            <Typography className='font-semibold text-2xl'>{packageDetail.travelAgency.businessName}</Typography>
                        </div>
                        <Typography className="font-semibold text-2xl text-right ml-14">
                            {formatCurrency(packageDetail.price, 'PHP')}
                        </Typography>
                    </Typography>

                    <Typography variant="h5" className="text-slate-500 italic">
                        Downpayment Policy:  ₱{packageDetail.dpPolicy}
                    </Typography>
                    <p><strong>Date: </strong>{formatDate(packageDetail.date)}</p>
                    <p><strong>Estimated Time: </strong>{formatBookingTime(packageDetail.checkIn, packageDetail.checkOut)}</p>
                    <p><strong>Max Joiners: </strong>{packageDetail.maxGuests}</p>
                    <p><strong>Coordinator:</strong> {packageDetail.coordinatorName}</p>

                    {/* 3-Column Layout for Inclusions, Exclusions, and Payment Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        <div>
                            <h4 className="text-lg mb-2"><strong>Package Inclusions:</strong></h4>
                            <ul className="list-none pl-5">
                                {packageDetail.packages && packageDetail.packages.length > 0 ? (
                                    packageDetail.packages.map((inclusion, idx) => (
                                        <li key={idx} className="mb-1">
                                            <span className="mr-2">✔</span>
                                            {packageNames[inclusion] ||inclusion}
                                        </li>
                                    ))
                                ) : (
                                    <p>No inclusions available.</p>
                                )}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg mb-2"><strong>Package Exclusions:</strong></h4>
                            <p>{packageDetail.exclusions || 'No exclusions provided.'}</p>
                        </div>
                        <div>
                            <h4 className="text-lg mb-2"><strong>Payment Details:</strong></h4>
                            <p>{packageDetail.paymentOptions || 'No payment details provided.'}</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Carousel for Package Images */}
                <div className="w-full max-w-[600px] ml-auto">
                    {packageDetail.packageImages && packageDetail.packageImages.length > 0 ? (
                        <Carousel
                            className="rounded-xl mt-4"
                            navigation={({ setActiveIndex, activeIndex, length }) => (
                                <div className="absolute bottom-2 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                                    {new Array(length).fill("").map((_, i) => (
                                        <span
                                            key={i}
                                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                                activeIndex === i ? "w-8 bg-blue-500" : "w-4 bg-blue-200"
                                            }`}
                                            onClick={() => setActiveIndex(i)}
                                        />
                                    ))}
                                </div>
                            )}
                        >
                            {packageDetail.packageImages.map((image, idx) => (
                                <img
                                    key={idx}
                                    src={image}
                                    alt={`Package image ${idx + 1}`}
                                    className="w-full h-64 object-cover rounded"
                                />
                            ))}
                        </Carousel>
                    ) : (
                        <p className="mt-4 text-gray-500">No images available for this package.</p>
                    )}
                </div>
            </div>

            {/* Joiner Form */}
            <JoinerDetailsForm packageId={packageId} packageDetail={packageDetail} />
        </div>
    );
}

export default CustomerPackageDetails;
