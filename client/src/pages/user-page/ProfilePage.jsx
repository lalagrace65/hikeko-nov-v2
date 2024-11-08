// ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // For navigating to login if not authenticated

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Sending the request to the profile route
                const response = await axios.get('/profile', { withCredentials: true });

                // If the request is successful, we set the user data in the state
                setUser(response.data);
            } catch (err) {
                // If there's an error (e.g., token is invalid or not found), show an error message
                setError('Unable to fetch profile. Please login again.');
                console.error(err);

                // Optionally redirect the user to the login page if not authenticated
                navigate('/login');
            }
        };

        // Fetch the user's profile data
        fetchUserProfile();
    }, [navigate]);

    if (error) return <div>{error}</div>;

    if (!user) return <div>Loading...</div>;

    return (
      <div className="grow bg-profileContainer ">
        <div className="profile-container bg-slate-100 p-6 mx-w-40 rounded-lg">
            <h1>User Profile</h1>
            <div className="profile-details">
                <p><strong>First Name:</strong> {user.firstName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </div>
        </div>
      </div>
    );
};

export default ProfilePage;
