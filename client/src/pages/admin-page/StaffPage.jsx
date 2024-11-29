import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UpdateStaff_Admin from "../../components/admin-components/UpdateStaff_Admin";
import { MultiLevelSidebar } from "@/components/admin-components/AdminSidebar";
import { baseUrl } from "@/Url";
import toast from "react-hot-toast";

export default function StaffPage() { 
    const navigate = useNavigate();
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

    const handleSuspend = (id) => {
        axios.put(`${baseUrl}/create-staff/suspend/${id}`, { withCredentials: true })
            .then((response) => {
                setStaff(staff.map(s => 
                    s._id === id ? { ...s, suspended: true } : s
                ));
                toast.success('Staff Account Suspended Successfully!');
            })
            .catch((error) => {
                console.error("Error suspending staff:", error);
            });
    };

    const handleRetrieve = (id) => {
        axios.put(`${baseUrl}/create-staff/retrieve/${id}`, { withCredentials: true })
            .then((response) => {
                setStaff(staff.map(s => 
                    s._id === id ? { ...s, suspended: false } : s
                ));
                toast.success('Staff Account Retrieved Successfully!');
            })
            .catch((error) => {
                console.error("Error retrieving staff:", error);
            });
    };

    return (
        <div className="flex min-h-screen">
            <MultiLevelSidebar className="min-h-screen" />
            <div className="flex-1 p-8 flex flex-col">
                <div className="flex-grow">
                    <div>
                        <div className="overflow-x-auto border bg-white shadow-lg rounded-xl p-6">  
                            <h2 className="text-xl mb-4">Staff Account List</h2>  
                            {staff.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">address</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact No.</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    <div className="flex flex-col items-start space-y-2 ">
                                                        {staffMember.suspended ? (
                                                            <button onClick={() => handleRetrieve(staffMember._id)} className="flex items-center space-x-1 bg-transparent text-green-600 hover:text-green-900 ">
                                                                <span>Retrieve</span>
                                                            </button>
                                                        ) : (
                                                            <button onClick={() => handleSuspend(staffMember._id)} className="flex items-center space-x-1 bg-transparent text-red-600 hover:text-red-900 ">
                                                                <span>Suspend</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No staff accounts found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
