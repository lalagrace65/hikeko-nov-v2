import React, { useEffect, useState } from "react";
import axios from "axios";
import { MultiLevelSidebar } from "@/components/admin-components/AdminSidebar";
import { baseUrl } from "@/Url";
import { useLocation, useNavigate } from "react-router-dom";
import { MedicalCondiToolTip } from "@/components/admin-components/MedicalCondiToolTip";
import { Button } from "@material-tailwind/react";

export default function AdminTransactionList() {
    const navigate = useNavigate();
    const location = useLocation();
    const [bookings, setBookings] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    // Highlight logic
    const queryParams = new URLSearchParams(location.search);
    const initialHighlight = queryParams.get("highlighted");
    const [highlightedReference, setHighlightedReference] = useState(initialHighlight);

    const handlePackageClick = (packageId) => {
        navigate(`/events?highlightedPackage=${packageId}`);
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${baseUrl}/booking-list/transactions`, { withCredentials: true });
                setBookings(response.data);

                // Determine the page containing the highlighted reference
                if (initialHighlight) {
                    const index = response.data.findIndex((booking) => booking.referenceCode === initialHighlight);
                    if (index !== -1) {
                        setCurrentPage(Math.floor(index / itemsPerPage) + 1);
                    }
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, [initialHighlight]);

    const toggleExpandedRow = (bookingId) => {
        setHighlightedReference(null);
        setExpandedRow(expandedRow === bookingId ? null : bookingId);
    };

    // Pagination Logic
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentBookings = bookings.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(bookings.length / itemsPerPage);

    return (
        <div className="flex h-screen">
            <MultiLevelSidebar />
            <div className="flex-1 p-8">
                <div className="overflow-x-auto border bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-xl mb-4">Transaction List</h2>
                    {bookings.length > 0 ? (
                        <div>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Booking Reference No.</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Package ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentBookings.map((booking) => (
                                        <React.Fragment key={booking._id}>
                                            <tr
                                                className={
                                                    booking.referenceCode === highlightedReference
                                                        ? "bg-yellow-100"
                                                        : expandedRow === booking._id
                                                        ? "bg-gray-200"
                                                        : "bg-white"
                                                }
                                                onClick={() => toggleExpandedRow(booking._id)}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.referenceCode}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.packageId}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    <button
                                                        className="flex items-center space-x-1 bg-transparent text-blue-600 hover:text-blue-900 md:font-semibold"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg>
                                                        <span>{expandedRow === booking._id ? "Less" : "More"}</span>
                                                    </button>
                                                </td>
                                            </tr>
                                            {expandedRow === booking._id && (
                                                <tr className="bg-gray-100">
                                                    <td colSpan="4" className="px-6 py-4">
                                                        <div className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                                                            <span><strong>Joiner Name:</strong> {booking.joinerName}</span>
                                                            <span><strong>Email:</strong> {booking.email}</span>
                                                            <span><strong>Contact Number:</strong> {booking.contactNumber}</span>
                                                            <span><strong>Pickup Location:</strong> {booking.pickupLocation}</span>
                                                            <span><strong>Age:</strong> {booking.age}</span>
                                                            <span><strong>Sex:</strong> {booking.sex}</span>
                                                            <span><strong>Home Address:</strong> {booking.homeAddress}</span>
                                                            <span><strong>Emergency Contact Person:</strong> {booking.emergencyContactPerson} ({booking.emergencyContactNumber})</span>
                                                            <span className="flex items-center space-x-1">
                                                                <strong>Medical Condition:</strong> {booking.medicalCondition ? "Yes" : "No"}
                                                                {booking.medicalCondition && <MedicalCondiToolTip conditionDetails={booking.conditionDetails} />}
                                                            </span>
                                                            <span><strong>Terms Accepted:</strong> {booking.termsAccepted ? "Yes" : "No"}</span>
                                                            <span><strong>Payment Type:</strong> {booking.paymentType}</span>
                                                            <span><strong>Proof of Payment:</strong> {booking.proofOfPayment}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-between items-center mt-4">
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
                        </div>
                    ) : (
                        <div>No bookings available</div>
                    )}
                </div>
            </div>
        </div>
    );
}
