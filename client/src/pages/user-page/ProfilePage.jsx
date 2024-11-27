import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '@/Url';
import toast from 'react-hot-toast';
import { MdStars } from "react-icons/md";
import { Card, CardBody, Tooltip, Typography } from '@material-tailwind/react';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [formState, setFormState] = useState({});
    const [error, setError] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [logo, setLogo] = useState({ link: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const navigate = useNavigate();

    const calculateAge = (dateOfBirth) => {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const data = new FormData();
            data.append('file', file);

            setIsUploading(true);
            try {
                const response = await axios.post('/api/upload', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                const link = response.data.links ? response.data.links[0] : '';
                setLogo({ link });
            } catch (error) {
                console.error('Upload failed:', error);
                toast.error('Upload failed');
            } finally {
                setIsUploading(false);
            }
        }
    };

    // Handle clicking the "Edit" span to open the file input
    const handleEditClick = () => {
        document.getElementById('avatar').click();
    };

    const handleSaveImg = async () => {
        setIsSaving(true);
        try {
            await axios.put(`${baseUrl}/profile/avatar`, { avatar: logo.link }, {
                withCredentials: true,
            });
            toast.success('Profile image updated successfully');
        } catch (error) {
            console.error('Save failed:', error);
            toast.error('Failed to save image');
        } finally {
            setIsSaving(false);
            setIsModalOpen(false); // Close modal after saving
            window.location.reload();
        }
    };

    const handleImageClick = () => {
        setIsModalOpen(true);
    };


    const handleSave = async () => {
        setIsSaving(true);
        try {
            await axios.put(`${baseUrl}/profile/update`, formState, {
                withCredentials: true,
            });
            toast.success('Profile updated successfully');
            setUser(formState); // Update user state after saving
        } catch (error) {
            console.error('Update failed:', error);
            toast.error('Failed to update profile');
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${baseUrl}/profile`, {
                    withCredentials: true,  // Ensure cookies are sent along with the request
                });
                
                // Process the response data
                setUser(response.data);
                setFormState(response.data);
                if (response.data.avatar) {
                    setLogo({ link: response.data.avatar });
                }
            } catch (error) {
                setError('Unable to fetch profile. Please login again.');
                console.error('Error fetching profile data:', error);
            }
        };

        fetchUserProfile();
    }, [navigate]);

    if (error) return <div>{error}</div>;
    if (!user) return <div>Loading...</div>;

    const age = calculateAge(user.dateOfBirth);

    return (
        <div className="flex flex-wrap md:flex-row lg:flex-row grow bg-profileContainer justify-center items-start gap-6 p-20">
            {/* Left Column */}
            <div className="bg-white p-6 rounded-xl md:w-1/4 lg:w-1/6 relative shadow-xl">
            {/* Content */}
            <div className="flex mb-4">
                    <Tooltip  content="Change Image" className="bg-gray-700 text-xs">
                        {logo.link ? (
                            <img
                                src={user.avatar}
                                onClick={handleImageClick}
                                className="w-40 h-40 rounded-full object-cover cursor-pointer hover:opacity-80"
                                alt="User Avatar"
                            />
                        ) : (
                            <div
                                className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
                                onClick={handleImageClick}
                            >
                                No Image
                            </div>
                        )}
                    </Tooltip>       
                </div>
                <div className="gap-4 mt-4">
                    <Typography variant="h4" className="uppercase font-semibold text-primary">
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Typography className="flex items-center gap-1 text-sm font-semibold mb-1 text-gray-600 ">
                        {user.email}
                    </Typography>
                    <div className="flex gap-4">
                        <Typography color="blue-gray" className="text-md font-semibold mt-6">Reward Points</Typography>
                    </div>
                    <div className="flex items-center gap-4">
                        <Typography className="mt-2 text-primary flex items-center" variant="h6">
                            <div className="flex gap-1 items-center">
                                <MdStars className="text-xl" />
                                {user.rewardPoints} Points
                            </div>
                        </Typography>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/3 lg:w-1/4">
                <Card className="shadow-lg">
                    <CardBody>
                        <Typography variant="h5" className="mb-4 text-primary">Update Account Profile</Typography>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSave();
                            }}
                        >
                            <div className="grid grid-cols-2 gap-1">
                                {/* First Name */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        value={formState.firstName || ''}
                                        onChange={(e) =>
                                            setFormState({ ...formState, firstName: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border rounded-md"
                                        required
                                    />
                                </div>

                                {/* Last Name */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        value={formState.lastName || ''}
                                        onChange={(e) =>
                                            setFormState({ ...formState, lastName: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border rounded-md"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={formState.email || ''}
                                    onChange={(e) =>
                                        setFormState({ ...formState, email: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>

                            {/* Address */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    value={formState.address || ''}
                                    onChange={(e) =>
                                        setFormState({ ...formState, address: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>

                            {/* Contact Number */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                                <input
                                    type="tel"
                                    value={formState.contactNo || ''}
                                    onChange={(e) =>
                                        setFormState({ ...formState, contactNo: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            {/* Emergency Contact Number */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Emergency Contact Number
                                </label>
                                <input
                                    type="tel"
                                    value={formState.emergencyContactNo || ''}
                                    onChange={(e) =>
                                        setFormState({ ...formState, emergencyContactNo: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-primary text-white px-4 py-2 rounded-md hover:shadow-lg transition duration-300 ease-in-out"
                                    disabled={isSaving}
                                >
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
            {/* Modal for updating profile image */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-6 text-center">Update Profile Image</h2>
                        <div className="flex flex-col items-center justify-center">
                            {/* Image Preview or Placeholder */}
                            <div className='border px-20 py-10 text-center'>
                                <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer">
                                    {logo.link ? (
                                        <img
                                            src={logo.link}
                                            alt="Profile Preview"
                                            className="w-full h-full object-cove"
                                            onClick={handleEditClick}
                                        />
                                    ) : (
                                        <span className="text-gray-500">No Image</span>
                                    )}
                                </div>
                                <label htmlFor="avatar" className='cursor-pointer'>
                                    {isUploading ? 'Uploading...' : 'Upload Photo'}
                                </label>
                            </div>
                            {/* Upload Button */}
                            <input
                                id="avatar"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out"
                                onClick={() => setIsModalOpen(false)}
                                disabled={isSaving || isUploading}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-primary text-white px-4 py-2 rounded-lg hover:shadow-lg transition duration-300 ease-in-out"
                                onClick={handleSaveImg}
                                disabled={isSaving || isUploading}
                            >
                                {isSaving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
