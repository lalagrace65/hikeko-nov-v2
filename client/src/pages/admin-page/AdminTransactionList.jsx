import React, { useEffect, useState } from "react";
import axios from "axios";
import { MultiLevelSidebar } from "@/components/admin-components/AdminSidebar";
import { baseUrl } from "@/Url";
import { useLocation } from "react-router-dom";

export default function AdminTransactionList() {
    const location = useLocation();
    const [bookings, setBookings] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);

    // Get the highlighted booking reference from the URL initially
    const queryParams = new URLSearchParams(location.search);
    const initialHighlight = queryParams.get("highlighted");
    const [highlightedReference, setHighlightedReference] = useState(initialHighlight);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${baseUrl}/booking-list/transactions`, { withCredentials: true });
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, []);

    const toggleExpandedRow = (bookingId) => {
        // Clear the highlighted reference when a row is clicked
        setHighlightedReference(null);
        setExpandedRow(expandedRow === bookingId ? null : bookingId);
    };

    return (
        <div className="flex h-screen">
            <MultiLevelSidebar />
            <div className="flex-1 p-8">
                <div className="overflow-x-auto border bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-xl mb-4">Transaction List</h2>
                    {bookings.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Booking Reference No.</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Package ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookings.map((booking) => (
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
                                                    <span>{expandedRow === booking._id ? "Less" : "More"}</span>
                                                </button>
                                            </td>
                                        </tr>
                                        {expandedRow === booking._id && (
                                            <tr className="bg-gray-100">
                                                <td colSpan="4" className="px-6 py-4">
                                                    <div className="grid grid-cols-1 gap-1 text-sm text-gray-600">
                                                        <p><strong>Terms Accepted:</strong> {booking.termsAccepted ? "Yes" : "No"}</p>
                                                        <p><strong>Payment Type:</strong> {booking.paymentType}</p>
                                                        <p><strong>Proof of Payment:</strong> {booking.proofOfPayment}</p>
                                                    </div>
                                                </td>
                                            </tr>
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
    );
}
