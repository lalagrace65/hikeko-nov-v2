import React,{ useEffect, useState } from "react";
import axios from "axios";
import { MultiLevelSidebar } from "@/components/admin-components/AdminSidebar";
import { baseUrl } from "@/Url";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

export default function AdminBookingList() {
    const navigate = useNavigate(); 
    const location = useLocation();
    const [bookings, setBookings] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Extract the highlighted incrementingId from the query parameter
    const queryParams = new URLSearchParams(location.search);
    const highlightedId = queryParams.get("highlighted");
    const [highlightedReference, setHighlightedReference] = useState(highlightedId);


    const handleReferenceCodeClick = (referenceCode) => {
        // Navigate to AdminTransactionList page with the reference code as a query parameter
        navigate(`/admin/transactions?highlighted=${referenceCode}`);
      };    

      useEffect(() => {
        axios.get(`${baseUrl}/booking-list`, { withCredentials: true })
          .then(({ data }) => {
            console.log("Fetched grouped bookings:", data);
            setBookings(data); // Set bookings after data is fetched
          })
          .catch((err) => {
            console.error("Error fetching bookings:", err);
          });
      }, []);     
        

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
                <div>
                        <div>
                            <div className="overflow-x-auto border bg-white shadow-lg rounded-xl p-6">  
                                <h2 className="text-xl mb-4">Joiner List</h2>  
                                {bookings.length > 0 ? (
                                    <div>
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Customer Id</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Customer Name</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {currentBookings.map((booking, index) => (
                                                <React.Fragment key={index}>
                                                    {/* Parent Row */}
                                                    <tr
                                                    key={index}
                                                    className={`${
                                                        booking.incrementingId === highlightedReference
                                                            ? "bg-yellow-100" // Highlighted style
                                                            : expandedRow === index
                                                            ? "bg-gray-200"
                                                            : "bg-white"
                                                    }`}
                                                >
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.incrementingId}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.firstName} {booking.lastName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.email}</td>   
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                            <button
                                                                className="flex items-center space-x-1 bg-transparent text-blue-600 hover:text-blue-900 md:font-semibold"
                                                                onClick={() => toggleExpandedRow(index)}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                </svg>
                                                                <span>{expandedRow === index ? "Less" : "More"}</span>
                                                            </button>
                                                        </td>
                                                    </tr>

                                                    {/* Expanded Row */}
                                                    {expandedRow === index && (
                                                        <>  
                                                            {/* Expanded Row for Booking Details */}
                                                            <tr className="bg-gray-100">
                                                                    <td colSpan="4" className="px-6 py-4">
                                                                        <div className="grid grid-cols-1 gap-1 text-sm text-gray-600">
                                                                            <span className="text-primary"><strong>CUSTOMER DETAILS</strong></span>
                                                                            <span><strong>Date of Birth:</strong> {new Date(booking.dateOfBirth).toISOString().split("T")[0]}</span>
                                                                            <span><strong>Home Address:</strong> {booking.address}</span>
                                                                            <span><strong>Contact No.:</strong> {booking.contactNo}</span>
                                                                            <span><strong>Emergency Contact:</strong> {booking.emergencyContactNo}</span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            
                                                            {/* Expanded Row for Transaction History */}
                                                            <tr className="bg-gray-100">
                                                                <td colSpan="4" className="px-6 py-4">
                                                                    <div className="grid grid-cols-1 gap-1 text-sm text-gray-600">
                                                                        <span className="text-primary"><strong>TRANSACTION HISTORY</strong></span>
                                                                        <ul className="grid grid-cols-3">
                                                                            {booking.transactions.map((transaction, tIndex) => (
                                                                                <li key={tIndex} className="mb-1">
                                                                                    <span
                                                                                        className="cursor-pointer hover:underline hover:text-blue-600"
                                                                                        onClick={() => handleReferenceCodeClick(transaction.referenceCode)}
                                                                                    >
                                                                                        {transaction.referenceCode}
                                                                                    </span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </>
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
            </div>
        </div>
    );
}
