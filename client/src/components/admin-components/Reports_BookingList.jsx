import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/Url";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";  // For Excel export
import { jsPDF } from "jspdf";  // For PDF export
import "jspdf-autotable";  // Import the autoTable plugin for jsPDF

function Reports_BookingList() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;  // Set 8 items per page

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

  // Pagination Logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = bookings.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  // Print Function
  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print");
    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.close();
    printWindow.print();
  };

  // Excel Export Function
  const handleExcelExport = () => {
    const ws = XLSX.utils.json_to_sheet(bookings);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bookings");
    XLSX.writeFile(wb, "Bookings_Report.xlsx");
  };

  // PDF Export Function
  const handlePdfExport = () => {
    const doc = new jsPDF();
    const table = document.getElementById("table-to-print");

    // Use autoTable from jspdf-autotable
    doc.autoTable({ html: table });

    doc.save("Bookings_Report.pdf");
  };

  // Pagination handlers
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className="overflow-x-auto border bg-white shadow-lg rounded-xl p-6 mt-12">
      <h2 className="text-xl mb-4">Top 5 Customers</h2>

      {/* Buttons for Print, Excel, and PDF export */}
      <div className="mb-4">
        <button
          onClick={handlePrint}
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Print
        </button>
        <button
          onClick={handleExcelExport}
          className="mr-2 px-4 py-2 bg-green-500 text-white rounded"
        >
          Export to Excel
        </button>
        <button
          onClick={handlePdfExport}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Export to PDF
        </button>
      </div>

      {bookings.length > 0 ? (
        <div>
          <table
            id="table-to-print" // Add id for targeting the table in print and export
            className="min-w-full divide-y divide-gray-200"
          >
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
              {currentBookings.map((booking, index) => (
                <tr key={index} className="bg-white">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {startIndex + index + 1}
                  </td>
                  <td
                    onClick={() => handleIncementingIdClick(booking.incrementingId)}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 hover:text-blue-500 hover:cursor-pointer hover:underline"
                  >
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

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={goToFirstPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
              First
            </button>
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
              Next
            </button>
            <button
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
              Last
            </button>
          </div>
        </div>
      ) : (
        <div>No Joiners Available</div>
      )}
    </div>
  );
}

export default Reports_BookingList;
