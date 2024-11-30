import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/Url";
import * as XLSX from "xlsx";  // For Excel export
import { jsPDF } from "jspdf";  // For PDF export
import "jspdf-autotable"; // Import autoTable plugin

function Reports_Staff() {
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        axios.get(`${baseUrl}/create-staff`, { withCredentials: true })
            .then(({ data }) => {
                setStaff(data);
            })
            .catch((err) => {
                console.error("Error fetching staff data:", err);
            });
    }, []);

    const handlePrint = () => {
        const printContent = document.getElementById("table-to-print");
        const printWindow = window.open("", "_blank", "width=800,height=600");
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.close();
        printWindow.print();
    };

    // Excel Export Function
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
        XLSX.utils.book_append_sheet(wb, ws, "Staff"); // Append the sheet to workbook

        // Export to Excel
        XLSX.writeFile(wb, "Staff_Report.xlsx");
    };


    // PDF Export Function
    const handlePdfExport = () => {
        const doc = new jsPDF();
        const table = document.getElementById("table-to-print");

        // Use autoTable from jspdf-autotable
        doc.autoTable({ html: table });

        doc.save("Staff_Report.pdf");
    };

    return (
        <div className="overflow-x-auto border bg-white shadow-lg rounded-xl p-6 mt-12">
            <h2 className="text-xl mb-4">Staff Account List</h2>
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
            {staff.length > 0 ? (
                <table
                    id="table-to-print" // Add id for targeting the table in print and export
                    className="min-w-full divide-y divide-gray-200"
                >
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact No.</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {staff.map((staffMember) => (
                            <tr key={staffMember._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{staffMember.incrementingId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{staffMember.firstName} {staffMember.lastName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{staffMember.address}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{staffMember.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{staffMember.contactNo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No staff accounts found.</p>
            )}
        </div>
    );
}

export default Reports_Staff;
