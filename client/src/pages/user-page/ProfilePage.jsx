// ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    const age = calculateAge(user.dateOfBirth);


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
                    <p><strong>Reward points:</strong> {user.rewardPoints}</p>
                    <p><strong>Age:</strong> {age}</p> 
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
