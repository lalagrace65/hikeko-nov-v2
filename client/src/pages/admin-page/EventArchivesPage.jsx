import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { MultiLevelSidebar } from "@/components/admin-components/AdminSidebar";
import toast from "react-hot-toast";

export default function EventArchivesPage() {
    const [archivedPackages, setArchivedPackages] = useState([]);

    function formatTimestamp(dateCreated) {
        return dayjs(dateCreated).format('YYYY-MM-DD HH:mm:ss');
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/packages/${id}`, { withCredentials: true })
            .then((response) => {
                console.log("Package deleted:", response.data);
                // Update archivedPackages state to remove the deleted package
                setArchivedPackages(archivedPackages.filter(pkg => pkg._id !== id));
                toast.success('Event deleted successfully!');
            })
            .catch((error) => {
                console.error("Error deleting package:", error);
                toast.error('Event deleted failed!');
            });
    };


    useEffect(() => {
        // Fetch archived packages from the API
        axios.get('http://localhost:4000/packages?includeArchived=true', { withCredentials: true })
            .then(({ data }) => {
                // Assuming that the data returned are archived packages only
                const archivedOnly = data.filter(pkg => pkg.isArchived); // Apply further filtering if necessary
                console.log("Fetched archived packages:", archivedOnly);
                setArchivedPackages(archivedOnly);
            })
            .catch((err) => {
                console.error("Error fetching archived packages:", err);
            });
    }, []);

    return (
        <div className="flex min-h-screen">
            <MultiLevelSidebar className="min-h-screen" />
            <div className="flex-1 p-8 flex flex-col">
                <div className="flex-grow">
                    <div className="overflow-x-auto border bg-white shadow-lg rounded-xl p-6">
                        <h2 className="text-xl mb-4">Archived Event Packages</h2>
                        {archivedPackages.length > 0 ? (
                            <table className="min-w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mountain Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Packages</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coordinator</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time Archived</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {archivedPackages.map((pkg) => {
                                        const formattedDate = dayjs(pkg.date).format('MM-DD-YYYY');
                                        return (
                                            <tr key={pkg._id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {pkg.trailId ? pkg.trailId.title : 'Trail Title Not Available'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                    <ul className="list-disc list-inside">
                                                        {pkg.packages.map((item, index) => (
                                                            <li key={index} className="py-1">{item}</li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pkg.coordinatorName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pkg.price}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formattedDate}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatTimestamp(pkg.archivedTimestamp)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    <button 
                                                        className="gap-1 flex bg-transparent text-red-600 hover:text-red-900 md:font-semibold" 
                                                        onClick={() => handleDelete(pkg._id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                                            </svg>
                                                            <span>Delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            <div>No archived packages found.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
