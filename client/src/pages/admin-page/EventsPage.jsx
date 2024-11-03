import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import EditEvent from "../../components/admin-components/EditEvent";
import { MultiLevelSidebar } from "@/components/admin-components/AdminSidebar";
import PackageModal from "@/components/admin-components/AdminEventModal";
import toast from "react-hot-toast";

export default function EventsPage() {
    const [open, setOpen] = React.useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [packages, setPackages] = useState([]); 
    const [updatedData, setUpdatedData] = useState({
        trailId: '',
        packages: '',
        additionalPackages: '',
        price: '',
        paymentOptions: '',
        exclusions: '',
        pickupLocation: '',
        coordinatorName: '',
        extraInfo: '',
        checkIn: '',
        checkOut: '',
        maxGuests: '',
        dpPolicy: '',
        date: '', 
    });
    const [editMode, setEditMode] = useState(false);
    const [selectedPackageId, setSelectedPackageId] = useState(null);  

    function formatTimestamp(dateCreated) {
        return dayjs(dateCreated).format('YYYY-MM-DD HH:mm:ss');
    }    

    useEffect(() => {
        axios.get('http://localhost:4000/packages?includeArchived=false', { withCredentials: true })
            .then(({ data }) => {
                console.log("Fetched packages:", data);
                setPackages(data); 
            })
            .catch((err) => {
                console.error("Error fetching packages:", err);
            });
    }, []);

    const handleEdit = (pkg) => {
        setEditMode(true);
        setSelectedPackageId(pkg._id);
        setUpdatedData({
            trailId: pkg.trailId,
            packages: pkg.packages.join(', '),
            additionalPackages: pkg.additionalPackages,
            price: pkg.price,
            paymentOptions: pkg.paymentOptions,
            exclusions: pkg.exclusions,
            pickupLocation: pkg.pickupLocation,
            extraInfo: pkg.extraInfo,
            coordinatorName: pkg.coordinatorName,
            checkIn: pkg.checkIn,
            checkOut: pkg.checkOut,
            maxGuests: pkg.maxGuests,
            dpPolicy: pkg.dpPolicy,
            date: pkg.date,
        });
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:4000/packages/${selectedPackageId}`, updatedData, { withCredentials: true })
            .then((response) => {
                console.log("Package updated:", response.data);
                setEditMode(false);
                setPackages(packages.map(pkg => 
                    pkg._id === selectedPackageId ? response.data : pkg
                ));
            })
            .catch((error) => {
                console.error("Error updating package:", error);
            });
    };

    const handleArchive = (id) => {
        const archivedTimestamp = dayjs().format('YYYY-MM-DD HH:mm:ss'); // Current timestamp
    
        axios.put(`http://localhost:4000/packages/${id}/archive`, { archivedTimestamp }, { withCredentials: true })
            .then((response) => {
                console.log("Package archived:", response.data);
                // Remove the archived package from the state
                setPackages(packages.filter(pkg => pkg._id !== id));
                toast.success('Event archived successfully!');  
            })
            .catch((error) => {
                console.error("Error archiving package:", error);
                toast.error('Event archived failed!');
            });
    };
        

    const handleOpen = (pkg) => {
        setSelectedPackage(pkg); // Set the selected package
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="flex min-h-screen">
            <MultiLevelSidebar className="min-h-screen" />
            <div className="flex-1 p-8 flex flex-col">
                <div className="flex-grow">
                    {editMode ? (
                        <form onSubmit={handleSaveEdit} className="mb-6">
                            <EditEvent 
                                updatedData={updatedData} 
                                setUpdatedData={setUpdatedData} 
                                setEditMode={setEditMode} 
                                packageId={selectedPackageId} />
                        </form>
                    ) : (
                        <div>
                            <div className="overflow-x-auto border bg-white shadow-lg rounded-xl p-6">  
                                <h2 className="text-xl mb-4">Event List</h2>  
                                {packages.length > 0 ? (
                                    <table className="min-w-full">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mountain Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Packages</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coordinator</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time Created</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {packages.map((pkg) => {
                                                const formattedDate = dayjs(pkg.date).format('MM-DD-YYYY');
                                                return (
                                                    <tr key={pkg._id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                            <h2>{pkg.trailId ? pkg.trailId.title : 'Trail Title Not Available'}</h2>
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
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatTimestamp(pkg.dateCreated)}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600"></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                            <div className="flex flex-col items-start space-y-2">
                                                                <button 
                                                                    className="flex items-center gap-1 bg-transparent text-blue-600 hover:text-blue-900 md:font-semibold"
                                                                    onClick={() => handleOpen(pkg)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                        </svg>
                                                                        <span>More</span>
                                                                </button>
                                                                <button 
                                                                    className="flex items-center gap-1 bg-transparent text-blue-600 hover:text-blue-900 md:font-semibold"
                                                                    onClick={() => handleEdit(pkg)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                                        </svg>
                                                                        <span>Edit</span>
                                                                </button>
                                                                <button 
                                                                    className="flex items-center gap-1 bg-transparent text-red-600 hover:text-red-900 md:font-semibold" 
                                                                    onClick={() => handleArchive(pkg._id)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                                                        </svg>
                                                                        <span>Archive</span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No event packages found.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
             {/* Add the PackageModal component */}
             <PackageModal className="shadow-2xl"
                open={open} 
                handleClose={handleClose} 
                packageData={selectedPackage} 
            />
        </div>
    );
}
