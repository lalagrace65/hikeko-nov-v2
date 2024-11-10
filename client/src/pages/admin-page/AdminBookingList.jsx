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
    const [updatedData, setUpdatedData] = useState({
        joinerName: '',
        email: '',
        contactNumber: '',
        pickupLocation: '',
        age: '',
        sex: '',
        homeAddress: '',
        emergencyContactPerson: '',
        emergencyContactNumber: '',
        medicalCondition: false,
        conditionDetails: '',
        proofOfPayment: '',
        termsAccepted: false,
        trailId: '',
        packageId: '',
        referenceCode: '',
    });
    const [editMode, setEditMode] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    
    const handleReferenceCodeClick = (referenceCode) => {
        // Navigate to AdminTransactionList page with the reference code as a query parameter
        navigate(`/admin/transactions?highlighted=${referenceCode}`);
      };    

    useEffect(() => {
        axios.get(`${baseUrl}/booking-list`, { withCredentials: true })
            .then(({ data }) => {
                console.log("Fetched bookings:", data);
                setBookings(data); 
            })
            .catch((err) => {
                console.error("Error fetching bookings:", err);
            });
    }, []);

    const toggleExpandedRow = (bookingId) => {
        setExpandedRow(expandedRow === bookingId ? null : bookingId);
    };

    const handleEdit = (booking) => {
        setEditMode(true);
        setSelectedBookingId(booking._id);
        setUpdatedData({
            joinerName: booking.joinerName,
            email: booking.email,
            contactNumber: booking.contactNumber,
            pickupLocation: booking.pickupLocation,
            age: booking.age,
            sex: booking.sex,
            homeAddress: booking.homeAddress,
            emergencyContactPerson: booking.emergencyContactPerson,
            emergencyContactNumber: booking.emergencyContactNumber,
            medicalCondition: booking.medicalCondition,
            conditionDetails: booking.conditionDetails,
            proofOfPayment: booking.proofOfPayment,
            termsAccepted: booking.termsAccepted,
            trailId: booking.trailId,
            packageId: booking.packageId,
            referenceCode: booking.referenceCode,
        });
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
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Joiner Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Contact Number</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {bookings.map((booking) => (
                                                <React.Fragment key={booking._id}>
                                                    {/* Parent Row with Conditional Gray Background */}
                                                    <tr key={booking._id} className={expandedRow === booking._id ? "bg-gray-200" : "bg-white"}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.joinerName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.email}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.contactNumber}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                            <button
                                                                className="flex items-center space-x-1 bg-transparent text-blue-600 hover:text-blue-900 md:font-semibold"
                                                                onClick={() => toggleExpandedRow(booking._id)}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                </svg>
                                                                <span>{expandedRow === booking._id ? "Less" : "More"}</span>
                                                            </button>
                                                        </td>
                                                    </tr>

                                                    {/* Expanded Row with Transaction History and Grayed Background */}
                                                    {expandedRow === booking._id && (
                                                        <>
                                                            {/* Expanded Row for Booking Details */}
                                                            <tr className="bg-gray-100">
                                                                <td colSpan="4" className="px-6 py-4">
                                                                    <div className="grid grid-cols-1 gap-1 text-sm text-gray-600">
                                                                        <span><strong>Age:</strong> {booking.age}</span>
                                                                        <span><strong>Sex:</strong> {booking.sex}</span>
                                                                        <span><strong>Home Address:</strong> {booking.homeAddress}</span>
                                                                        <span><strong>Emergency Contact:</strong> {booking.emergencyContactPerson} ({booking.emergencyContactNumber})</span>
                                                                        <span className="flex items-center space-x-1">
                                                                            <strong>Medical Condition:</strong> {booking.medicalCondition ? "Yes" : "No"}
                                                                            {booking.medicalCondition && <MedicalCondiToolTip conditionDetails={booking.conditionDetails} />}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                            {/* Expanded Row for Transaction History */}
                                                            <tr className="bg-gray-100">
                                                                <td colSpan="4" className="px-6 py-4">
                                                                    <span className="mb-2"><strong>TRANSACTION HISTORY</strong></span>
                                                                    <div className="grid grid-cols-6 gap-1 text-sm text-gray-600">
                                                                        <span
                                                                            key={booking.referenceCode}
                                                                            className="cursor-pointer hover:underline hover:text-blue-600"
                                                                            onClick={() => handleReferenceCodeClick(booking.referenceCode)} // Handle click
                                                                        >
                                                                            {booking.referenceCode}
                                                                        </span>
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
