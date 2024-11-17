import React,{ useEffect, useState } from "react";
import axios from "axios";
import EditEvent from "../../components/admin-components/EditEvent";
import { MultiLevelSidebar } from "@/components/admin-components/AdminSidebar";
import { baseUrl } from "@/Url";
import { MedicalCondiToolTip } from "@/components/admin-components/MedicalCondiToolTip";
import { useNavigate } from "react-router-dom";

export default function AdminBookingList() {
    const navigate = useNavigate(); 
    const [bookings, setBookings] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);

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
        setExpandedRow(expandedRow === bookingId ? null : bookingId);
    };

    return (
        <div className="flex h-screen">
            <MultiLevelSidebar />
            <div className="flex-1 p-8">
                <div>
                        <div>
                            <div className="overflow-x-auto border bg-white shadow-lg rounded-xl p-6">  
                                <h2 className="text-xl mb-4">Joiner List</h2>  
                                {bookings.length > 0 ? (
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
                                        {bookings.map((booking, index) => (
                                            <React.Fragment key={index}>
                                                {/* Parent Row */}
                                                <tr key={index} className={expandedRow === index ? "bg-gray-200" : "bg-white"}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.incrementingId}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.firstName} {booking.lastName}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.email}</td>   
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    <button
                                                            className="flex items-center space-x-1 bg-transparent text-blue-600 hover:text-blue-900 md:font-semibold"
                                                            onClick={() => toggleExpandedRow(index)}
                                                        >
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
                                                                    <span><strong>TRANSACTION HISTORY</strong></span>
                                                                    <ul>
                                                                        {booking.transactions.map((transaction, tIndex) => (
                                                                            <li key={tIndex}>
                                                                                <span
                                                                                    className="cursor-pointer hover:underline hover:text-blue-600"
                                                                                    onClick={() => handleReferenceCodeClick(transaction.referenceCode)}
                                                                                >
                                                                                    {transaction.referenceCode}
                                                                                </span>
                                                                                {/* Display additional details as needed */}
                                                                                <span> -  {transaction.otherDetails.joinerName}</span>
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
