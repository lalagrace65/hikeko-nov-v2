import React, { useEffect, useState } from "react";
import { Dialog, Card, CardBody, Typography, Button } from "@material-tailwind/react";
import axios from "axios";
import dayjs from "dayjs";
import { baseUrl } from "@/Url";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PackageModal = ({ open, handleClose, packageData }) => {
    const [bookings, setBookings] = useState([]);
    const [expandedRowId, setExpandedRowId] = useState(null); // State for expanded row

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7; // Number of bookings per page

    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchBookings = async () => {
            if (packageData && packageData._id) {
                try {
                    const response = await axios.get(
                        `${baseUrl}/bookings/package/${packageData._id}`
                    );
                    console.log("Bookings fetched:", response.data);
                    setBookings(response.data); // Set the fetched bookings
                } catch (error) {
                    console.error("Error fetching bookings:", error);
                }
            }
        };

        fetchBookings();
    }, [packageData]); // Fetch bookings when packageData changes

    function formatTime(time) {
        if (time && typeof time === 'object' && 'hours' in time && 'minutes' in time) {
            return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}`;
        }
        return '';
    }

    function formatTimestamp(timestamp) {
        return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
    }

    // To set user-friendly names for package types
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

    // Pagination Logic
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentBookings = bookings.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(bookings.length / itemsPerPage);

    // Handle row click to toggle expansion
    const handleRowClick = (bookingId) => {
        setExpandedRowId(expandedRowId === bookingId ? null : bookingId); // Toggle expanded row
    };

    // Handle referenceCode click to navigate to transactions
    const handleReferenceCodeClick = (referenceCode) => {
        navigate(`/admin/transactions?highlighted=${referenceCode}`); // Navigate to transactions page
    };

    return (
        <Dialog
            size="xl"
            open={open}
            handler={handleClose}
            className="bg-transparent shadow-none flex items-center justify-center"
        >
            <Card className="border h-[700px] w-[1000px] relative">
                <button 
                    onClick={handleClose} 
                    className="absolute top-4 right-4 bg-transparent p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
                    </svg>
                </button>
                <CardBody className="grid grid-cols-[1fr_2fr] gap-4 mt-10">
                    {/* Left Side: Package Details */}
                    <div className="p-4 border rounded-xl bg-adminModal">
                        <Typography className="mb-4" variant="h4" color="blue-gray">
                            Package Details
                        </Typography>
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <span><b>Mountain name:</b> {packageData ? packageData.trailId?.title : 'N/A'}</span>
                        </Typography>
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <span><b>Status:</b> {packageData ? packageData.status : 'N/A'}</span>
                        </Typography>
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <span><b>Packages:</b> </span>
                                {packageData && packageData.packages.length > 0 ? (
                                    <ul className="list-disc list-inside ml-4">
                                    {packageData.packages.map((item, index) => (
                                         <li key={index} className="py-1">{packageNames[item] || item}</li>
                                    ))}
                                </ul>
                                ) : (
                                    <span>N/A</span>
                            )}
                        </Typography> 
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <span><b>Additional package inclusions:</b> {packageData ? packageData.additionalPackages : 'N/A'} </span>
                        </Typography> 
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <span><b>Package Exclusions:</b> {packageData ? packageData.exclusions : 'N/A'}</span>
                        </Typography>   
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <span><b>Coordinator:</b> {packageData ? packageData.coordinatorName : 'N/A'}</span>
                        </Typography>   
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <span>
                                <b>Price:</b>{' '}
                                {packageData && packageData.price !== undefined
                                    ? new Intl.NumberFormat('en-PH', {
                                        style: 'currency',
                                        currency: 'PHP',
                                    }).format(packageData.price)
                                    : 'N/A'}
                            </span>
                        </Typography>
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <span><b>Payment Options:</b> {packageData ? packageData.paymentOptions : 'N/A'}</span>
                        </Typography>
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <span><b>Downpayment policy:</b> {packageData ? packageData.dpPolicy : 'N/A'}</span>
                        </Typography>
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <span><b>Pickup Location:</b> {packageData ? packageData.pickupLocation : 'N/A'}</span>
                        </Typography>  
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <span><b>Event Date:</b> {packageData && packageData.date ? new Date(packageData.date).toLocaleDateString() : 'N/A'}</span>
                        </Typography>
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <span><b>Event Time:</b> {packageData ? `${formatTime(packageData.checkIn)} - ${formatTime(packageData.checkOut)}` : 'N/A'}</span>
                        </Typography>
                    </div>

                    {/* Right Side: Bookings */}
                    <div className="p-4 border rounded-xl bg-adminModal flex flex-col">
                        <Typography className="mb-4" variant="h4" color="blue-gray">
                            Bookings
                        </Typography>
                        {bookings.length > 0 ? (
                        <div>
                            <table className="min-w-full table-auto divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left">Joiner Name</th>
                                        <th className="px-4 py-2 text-left"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {currentBookings.map((booking) => (
                                        <React.Fragment key={booking._id}>
                                            <tr
                                                className={`cursor-pointer ${expandedRowId === booking._id ? 'bg-gray-300' : ''}`}
                                                onClick={() => handleRowClick(booking._id)} // Toggle expanded row
                                            >
                                                <td className="px-4 py-2">{booking.joinerName}</td>
                                                <td className="px-4 py-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                                        <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                                                    </svg>
                                                    {expandedRowId === booking._id}
                                                </td>
                                            </tr>

                                            {/* Show additional details if this row is expanded */}
                                            {expandedRowId === booking._id && (
                                                <tr>
                                                    <td colSpan="3" className="px-4 py-2 bg-gray-100">
                                                        <Typography className="text-sm"><span className="font-semibold">Email:</span> {booking.email}</Typography>
                                                        <Typography className="text-sm"><span className="font-semibold">Contact:</span> {booking.contactNumber}</Typography>
                                                        <Typography className="text-sm"><span className="font-semibold">Pickup Location:</span> {booking.pickupLocation}</Typography>
                                                        <Typography className="text-sm"><span className="font-semibold">Booking Reference:</span>
                                                            <span
                                                                className="cursor-pointer hover:text-blue-500"
                                                                onClick={() => handleReferenceCodeClick(booking.referenceCode)} // Navigate on referenceCode click
                                                            >
                                                                {booking.referenceCode}
                                                            </span>
                                                        </Typography>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        ) : (
                        <Typography variant="h6" color="gray">
                            No bookings available.
                        </Typography>
                        )}
                        
                    </div>
                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-4 col-span-2">
                        <Button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                        >
                            Previous
                        </Button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                        >
                            Next
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </Dialog>
    );
};

export default PackageModal;
