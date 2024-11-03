import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import UpdateStaff_Admin from "../../components/admin-components/UpdateStaff_Admin";
import { MultiLevelSidebar } from "@/components/admin-components/AdminSidebar";

export default function StaffPage() { 
    const navigate = useNavigate(); // Initialize useNavigate
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
        navigate('/account/staff/add-staff'); // Navigate to add staff page
    };

    useEffect(() => {
        axios.get('http://localhost:4000/create-staff', { withCredentials: true })
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
        axios.put(`http://localhost:4000/create-staff/${selectedStaffId}`, {
            ...updatedData,
            oldPassword,
            newPassword,
        }, { withCredentials: true })
            .then((response) => {
                console.log("Staff updated:", response.data);
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

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/create-staff/${id}`, { withCredentials: true })
            .then((response) => {
                console.log("Staff deleted:", response.data);
                setStaff(staff.filter(s => s._id !== id));
            })
            .catch((error) => {
                console.error("Error deleting staff:", error);
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
                                                                <span className="font-semibold">Edit</span>
                                                            </button>

                                                            <button className="flex items-center space-x-1 bg-transparent text-red-600 hover:text-red-900" onClick={() => handleDelete(staffMember._id)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                                                </svg>
                                                                <span className="font-semibold">Delete</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))} 
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-center text-gray-500">No staff available.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
