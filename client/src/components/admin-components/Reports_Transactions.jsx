import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/Url";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import * as XLSX from "xlsx";  // For Excel export
import { jsPDF } from "jspdf";  // For PDF export
import "jspdf-autotable";

export default function Reports_Transactions() {
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

    const handleTransactionClick = (referenceCode) => {
        navigate(`/admin/transactions?highlighted=${referenceCode}`);
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

    const handlePrint = () => {
        const printContent = document.getElementById("table-to-print");
        const printWindow = window.open("", "_blank", "width=800,height=600");
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.close();
        printWindow.print();
      };
    
      // Excel Export Function
      const handleExcelExport = () => {
        // Get the table headers and rows
        const table = document.getElementById("table-to-print");
        const headers = table.querySelectorAll("th");
        const rows = table.querySelectorAll("tr");
    
        // Create an array to store table data
        const data = [];
        
        // Get table headers
        const headerRow = [];
        headers.forEach(header => {
            headerRow.push(header.innerText.trim());  // Collect text of headers
        });
        data.push(headerRow); // Add headers to the data array
    
        // Get table rows (excluding the header row)
        rows.forEach((row, rowIndex) => {
            if (rowIndex > 0) { // Skip the header row
                const rowData = [];
                const cells = row.querySelectorAll("td");
                cells.forEach(cell => {
                    rowData.push(cell.innerText.trim());  // Collect text of each cell
                });
                data.push(rowData); // Add row data to the data array
            }
        });
    
        // Create a worksheet and workbook
        const ws = XLSX.utils.aoa_to_sheet(data); // Convert the array to sheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Transactions"); // Append the sheet to workbook
    
        // Export to Excel
        XLSX.writeFile(wb, "Transactions_Report.xlsx");
        };
    
      // PDF Export Function
      const handlePdfExport = () => {
        const doc = new jsPDF();
        const table = document.getElementById("table-to-print");
    
        // Use autoTable from jspdf-autotable
        doc.autoTable({ html: table });
    
        doc.save("Transactions_Report.pdf");
      };

    // Pagination Logic
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentBookings = bookings.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(bookings.length / itemsPerPage);

    return (
        <div className="overflow-x-auto border bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl mb-4">Transaction List</h2>
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
                    <table id="table-to-print" className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Booking Reference No.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Package ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Joiner Name</th>
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
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600"
                                            onClick={() => handleTransactionClick(booking.referenceCode)}
                                        >
                                            {booking.referenceCode}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.packageId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.joinerName}</td>
                                        
                                    </tr>
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
    );
}
