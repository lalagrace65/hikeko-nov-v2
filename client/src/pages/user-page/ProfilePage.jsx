// ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '@/Url';
import toast from 'react-hot-toast';
import { Card, CardBody, CardFooter, Button, Typography } from '@material-tailwind/react';


const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [logo, setLogo] = useState({ link: '' });

    // Function to calculate age from date of birth
    const calculateAge = (dateOfBirth) => {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
            
        // Adjust age if the birthday hasn't occurred yet this year
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
    
            console.log('Upload response:', response.data);  // Log response data
            const link = response.data.links ? response.data.links[0] : ''; // Access the link inside the links array
            setLogo({ link });
            toast.success('Upload complete');
        } catch (error) {
            console.error('Upload failed:', error);
            toast.error('Upload failed');
        } finally {
            setIsUploading(false);
        }
        }
    };
  const handleSave = async () => {
    setIsSaving(true);
    try {
        // Make sure the authenticated user can update their profile
        const response = await axios.put(`${baseUrl}/profile/avatar`, { avatar: logo.link }, {
            withCredentials: true,  // Ensure the token in cookies is sent
        });
        console.log(response.data);
        toast.success('Profile saved successfully', response.data);
    } catch (error) {
        console.error('Save failed:', error);
        toast.error('Failed to save settings');
    } finally {
        setIsSaving(false);
    }
};


  // Handle clicking the "Edit" span to open the file input
  const handleEditClick = () => {
    document.getElementById('avatar').click();
  };
    

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${baseUrl}/profile`, { withCredentials: true });
                setUser(response.data);
                if (response.data.avatar) {
                    setLogo({ link: response.data.avatar });
                    console.log(response.data.avatar);
                  }
            } catch (err) {
                setError('Unable to fetch profile. Please login again.');
                console.error(err);
                navigate('/login');
            }
        };

        fetchUserProfile();
    }, [navigate]);


    if (error) return <div>{error}</div>;
    if (!user) return <div>Loading...</div>;

    const age = calculateAge(user.dateOfBirth);


    return (
        <div className="grow bg-profileContainer flex justify-center items-start gap-6 p-6">
            {/* Left Side: User Profile Details */}
            <div className=" bg-white p-6 rounded-lg w-full max-w-3xl">
                <div className="flex justify-center mb-4">
                    {logo.link ? (
                        <img
                            src={logo.link}
                            key={logo.link}
                            className="w-40 h-40 rounded-full object-cover"
                            alt="User Avatar"
                        />
                    ) : (
                        <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center">
                            No Image
                        </div>
                    )}
                </div>
                <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <span
                    onClick={handleEditClick}
                    className="block border rounded-2xl p-2 text-center cursor-pointer mt-2 hover:bg-gray-200 transition duration-300 ease-in-out"
                >
                    {isUploading ? 'Uploading...' : 'Edit'}
                </span>
                <button
                    className="mt-2 w-full primary hover:shadow-lg transition duration-300 ease-in-out"
                    onClick={handleSave}
                    disabled={isSaving || isUploading}
                >
                    {isSaving ? 'Saving...' : 'Save'}
                </button>
                <h1 className="text-xl font-semibold mt-4">User Profile</h1>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <p><strong>First Name:</strong> {user.firstName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Address:</strong> {user.address}</p>
                        <p><strong>Contact Number:</strong> {user.contactNo}</p>
                        <strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}
                    </div>
                    <div>
                        <p><strong>Last Name:</strong> {user.lastName}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <p><strong>Emergency Contact Number:</strong> {user.emergencyContactNo}</p>
                        <p><strong>Reward points:</strong> {user.rewardPoints}</p>
                        <p><strong>Age:</strong> {age}</p>
                    </div>
                </div>
            </div>

            {/* Right Side: Reward Card */}
            <div className="w-full max-w-xs">
                <Card className="shadow-lg">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray">
                            Reward Points
                        </Typography>
                        <Typography className="mt-2 text-primary" variant="h6">
                            <div className='flex gap-2 justify-center'>
                                <img src='/rewards-coins.png' className='w-12 h-12' alt='reward' />
                                {user.rewardPoints} Points
                            </div>
                        </Typography>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ProfilePage;
