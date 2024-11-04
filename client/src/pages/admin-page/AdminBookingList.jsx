import { useEffect, useState } from "react";
import axios from "axios";
import EditEvent from "../../components/admin-components/EditEvent";
import { MultiLevelSidebar } from "@/components/admin-components/AdminSidebar";
import { baseUrl } from "@/Url";

export default function AdminBookingList() {
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

    const handleSaveEdit = (e) => {
        e.preventDefault();
        axios.put(`${baseUrl}/booking-list/${selectedBookingId}`, updatedData, { withCredentials: true })
            .then((response) => {
                console.log("Booking updated:", response.data);
                setEditMode(false);
                setBookings(bookings.map(b => 
                    b._id === selectedBookingId ? response.data : b
                ));
            })
            .catch((error) => {
                console.error("Error updating booking:", error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`${baseUrl}/booking-list/${id}`, { withCredentials: true })
            .then((response) => {
                console.log("Booking deleted:", response.data);
                setBookings(bookings.filter(b => b._id !== id));
            })
            .catch((error) => {
                console.error("Error deleting booking:", error);
            });
    };

    return (
        <div className="flex h-screen">
            <MultiLevelSidebar />
            <div className="flex-1 p-8">
                <div>
                    {editMode ? (
                        <form onSubmit={handleSaveEdit} className="mb-6">
                            <EditEvent 
                                updatedData={updatedData} 
                                setUpdatedData={setUpdatedData} 
                                setEditMode={setEditMode} 
                                bookingId={selectedBookingId} />
                        </form>
                    ) : (
                        <div>
                            <div className="overflow-x-auto border bg-white shadow-lg rounded-xl p-6">  
                                <h2 className="text-xl mb-4">Booking List</h2>  
                                {bookings.length > 0 ? (
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Joiner Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Contact Number</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Package ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Reference Code</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {bookings.map((booking) => (
                                                <>
                                                    <tr key={booking._id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.joinerName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.email}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.contactNumber}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.packageId}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.referenceCode || 'N/A'} </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                            <button 
                                                                className="flex items-center space-x-1 bg-transparent text-blue-600 hover:text-blue-900 md:font-semibold"
                                                                onClick={() => toggleExpandedRow(booking._id)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                </svg>
                                                                <span>{expandedRow === booking._id ? "Less" : "More"}</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    {expandedRow === booking._id && (
                                                        <tr>
                                                            <td colSpan="6" className="px-6 py-4">
                                                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                                                    <p><strong>Pickup Location:</strong> {booking.pickupLocation}</p>
                                                                    <p><strong>Age:</strong> {booking.age}</p>
                                                                    <p><strong>Sex:</strong> {booking.sex}</p>
                                                                    <p><strong>Home Address:</strong> {booking.homeAddress}</p>
                                                                    <p><strong>Emergency Contact:</strong> {booking.emergencyContactPerson} ({booking.emergencyContactNumber})</p>
                                                                    <p><strong>Medical Condition:</strong> {booking.medicalCondition ? "Yes" : "No"}</p>
                                                                    {booking.conditionDetails && (
                                                                        <p><strong>Condition Details:</strong> {booking.conditionDetails}</p>
                                                                    )}
                                                                    <p><strong>Proof of Payment:</strong> {booking.proofOfPayment}</p>
                                                                    <p><strong>Terms Accepted:</strong> {booking.termsAccepted ? "Yes" : "No"}</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div>No bookings available</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
