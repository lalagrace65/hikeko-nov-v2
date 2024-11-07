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
    const [editMode, setEditMode] = useState(false);
    const [selectedStaffId, setSelectedStaffId] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        name: '',
        email: '',
        address: '',
        contactNo: '',
    });
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleAddStaffClick = () => {
        navigate('/account/staff/add-staff');
    };

    useEffect(() => {
        axios.get(`${baseUrl}/create-staff`, { withCredentials: true })
            .then(({ data }) => {
                setStaff(data);
            })
            .catch((err) => {
                console.error("Error fetching staff data:", err);
            });
    }, []);

    const handleEdit = (staffMember) => {
        setEditMode(true);
        setSelectedStaffId(staffMember._id);
        setUpdatedData({
            name: staffMember.name,
            email: staffMember.email,
            address: staffMember.address,
            contactNo: staffMember.contactNo,
        });
        setOldPassword('');
        setNewPassword('');
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        axios.put(`${baseUrl}/create-staff/${selectedStaffId}`, {
            ...updatedData,
            oldPassword,
            newPassword,
        }, { withCredentials: true })
            .then((response) => {
                setEditMode(false);
                setStaff(staff.map(s => 
                    s._id === selectedStaffId ? response.data : s
                ));
                setOldPassword('');
                setNewPassword('');
            })
            .catch((error) => {
                console.error("Error updating staff:", error);
            });
    };

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
                    {editMode ? (
                        <form onSubmit={handleSaveEdit} className="mb-6">
                            <UpdateStaff_Admin 
                                updatedData={updatedData}
                                setUpdatedData={setUpdatedData}
                                setEditMode={setEditMode}
                                oldPassword={oldPassword}
                                setOldPassword={setOldPassword}
                                newPassword={newPassword}
                                setNewPassword={setNewPassword}
                                staffId={selectedStaffId}
                            />
                        </form>
                    ) : (
                        <div>
                            <div className="overflow-x-auto border bg-white shadow-lg rounded-xl p-6">  
                                <h2 className="text-xl mb-4">Staff Account List</h2>  
                                {staff.length > 0 ? (
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact No.</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {staff.map((staffMember) => (
                                                <tr key={staffMember._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{staffMember._id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{staffMember.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{staffMember.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{staffMember.contactNo}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        <div className="flex flex-col items-start space-y-2 ">
                                                            <button className="flex items-center space-x-1 bg-transparent text-blue-600 hover:text-blue-900 " onClick={() => handleEdit(staffMember)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                                </svg>
                                                                <span>Edit</span>
                                                            </button>
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
                    )}
                </div>
            </div>
        </div>
    );
}
