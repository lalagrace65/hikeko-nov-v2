import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { baseUrl } from "@/Url";
import * as XLSX from "xlsx";  // For Excel export
import { jsPDF } from "jspdf";  // For PDF export
import "jspdf-autotable";  // Import the autoTable plugin for jsPDF

export default function Reports_Events() {
    const [filter, setFilter] = useState("");
    const [packages, setPackages] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const [itemsPerPage] = useState(5); // Number of items per page

    function formatTimestamp(dateCreated) {
        return dayjs(dateCreated).format('YYYY-MM-DD HH:mm:ss');
    }    

    useEffect(() => {
        axios.get(`${baseUrl}/packages?includeArchived=false`, { withCredentials: true })
            .then(({ data }) => {
                console.log("Fetched packages:", data);
                setPackages(data); 
            })
            .catch((err) => {
                console.error("Error fetching packages:", err);
            });
    }, []);
    
    const filteredPackages = packages.filter(pkg => {
        const mountainName = pkg.trailId?.title || '';
        const coordinatorName = pkg.coordinatorName || '';
        const price = pkg.price || '';
        const status = pkg.status || '';
        return (
            mountainName.toLowerCase().includes(filter.toLowerCase()) ||
            coordinatorName.toLowerCase().includes(filter.toLowerCase()) ||
            price.toString().toLowerCase().includes(filter.toLowerCase()) ||
            status.toLowerCase().includes(filter.toLowerCase())
        );
    });

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
        XLSX.utils.book_append_sheet(wb, ws, "Events"); // Append the sheet to workbook
    
        // Export to Excel
        XLSX.writeFile(wb, "Events_Report.xlsx");
    };
    
    // PDF Export Function
    const handlePdfExport = () => {
        const doc = new jsPDF();
        const table = document.getElementById("table-to-print");
    
        // Use autoTable from jspdf-autotable
        doc.autoTable({ html: table });
    
        doc.save("Events_Report.pdf");
    };

    // Calculate pagination data
    const totalItems = filteredPackages.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredPackages.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    function formatCurrency(amount, currency = 'PHP') {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency,
        }).format(amount);
    }    

    // To set user-friendly names for package types
    const packageNames = {
        vanTransfer: 'Van Transfer',
        registrationFee: 'Registration Fee',
        coordinatorFee: "Coordinator's Fee",
        tourGuideFee: 'Tour Guide Fee',
        environmentalFee: 'Environmental Fee',
        parkingFee: 'Parking Fee',
        bagTag: 'Bag Tag',
        driverFee: "Driver's Fee",
        droneService: 'Drone Shot Service',
    }; 

    return (
        <div className="overflow-x-auto border bg-white shadow-lg rounded-xl p-6">  
            <h2 className="text-xl mb-4">Event List</h2> 
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
            {currentItems.length > 0 ? (
                <table id="table-to-print" className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mountain Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Packages</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package Exclusions</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coordinator</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Options</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downpayment policy</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slot</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time Created</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ongoing</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ended</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentItems.map((pkg) => {
                            const formattedDate = dayjs(pkg.date).format('MM-DD-YYYY');
                            return (
                                <tr key={pkg._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        <h2>{pkg.trailId ? pkg.trailId.title : 'Trail Title Not Available'}</h2>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        <ul className="list-disc list-inside">
                                            {pkg.packages.map((item, index) => (
                                                <li key={index} className="py-1">
                                                    {packageNames[item] || item}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {pkg.exclusions && pkg.exclusions.split(/[\n,]/).map((item, index) => (
                                            <span key={index}>
                                                {item.trim()}
                                                <br />
                                            </span>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pkg.coordinatorName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600"> {pkg.paymentOptions}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {pkg.dpPolicy && pkg.dpPolicy.split(/[\n,]/).map((item, index) => (
                                            <span key={index}>
                                                {item.trim()}
                                                <br />
                                            </span>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pkg.pickupLocations || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatCurrency(pkg.price, 'PHP')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600"> {pkg.bookingCount}/ {pkg.maxGuests}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formattedDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatTimestamp(pkg.dateCreated)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pkg.status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pkg.ongoingTimestamp ? dayjs(pkg.ongoingTimestamp).format('HH:mm:ss') : 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pkg.endedTimestamp ? dayjs(pkg.endedTimestamp).format('HH:mm:ss') : 'N/A'}</td>
                    
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>No event packages found.</p>
            )}
            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>               
    );
}
