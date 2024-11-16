// ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('/profile', { withCredentials: true });
                setUser(response.data);
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

    return (
        <div className="grow bg-profileContainer flex justify-center items-center gap-0">
            <div className="profile-container bg-slate-100 p-6 max-w-sm rounded-lg">
                <h1>User Profile</h1>
                <div className="profile-details">
                    <p><strong>First Name:</strong> {user.firstName}</p>
                    <p><strong>Last Name:</strong> {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                    <p><strong>Contact Number:</strong> {user.contactNo}</p>
                    <p><strong>Emergency Contact Number:</strong> {user.emergencyContactNo}</p>
                    <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
