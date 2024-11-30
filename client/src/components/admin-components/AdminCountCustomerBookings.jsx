import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/Url";
import { useNavigate } from "react-router-dom";

function AdminCountCustomerBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  const handleIncementingIdClick = (incrementingId) => {
    navigate(`/admin/bookings?highlighted=${incrementingId}`);
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/booking-list`, { withCredentials: true })
      .then(({ data }) => {
        console.log("Fetched grouped bookings:", data);
        // Sort bookings by customerBookingCount in descending order
        const sortedBookings = data.sort(
          (a, b) => b.customerBookingCount - a.customerBookingCount
        );
        setBookings(sortedBookings);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
      });
  }, []);

  return (
    <div className="overflow-x-auto border bg-white shadow-lg rounded-xl p-6 mt-12">
      <h2 className="text-xl mb-4">Top 5 Customers</h2>
      {bookings.length > 0 ? (
        <div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Customer Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Booking Count
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.slice(0, 5).map((booking, index) => (
                <tr key={index} className="bg-white">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {index + 1}
                  </td>
                  <td onClick={() => handleIncementingIdClick(booking.incrementingId)} 
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 hover:text-blue-500 hover:cursor-pointer hover:underline">
                    {booking.incrementingId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {booking.firstName} {booking.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {booking.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {booking.customerBookingCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No Joiners Available</div>
      )}
    </div>
  );
}

export default AdminCountCustomerBookings;
