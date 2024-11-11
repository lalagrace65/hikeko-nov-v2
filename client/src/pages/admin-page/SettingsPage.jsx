// AdminDetails.jsx

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '@/UserContext';
import { MultiLevelSidebar } from '@/components/admin-components/AdminSidebar';
import { baseUrl } from '@/Url';


const AdminDetails = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/admin-details`, {
          withCredentials: true, // Send cookies with the request
        });
        setAdminDetails(response.data);
      } catch (error) {
        console.error('Error fetching admin details:', error);
      }
    };

    fetchAdminDetails();
  }, [user.token]);

  if (!adminDetails) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen">
      <MultiLevelSidebar className="min-h-screen" />
      <div className='flex-1 p-10'>
        <h1>Admin Details</h1>
        <p><strong>Business Name:</strong> {adminDetails.businessName}</p>
        <p><strong>Business Email:</strong> {adminDetails.businessEmail}</p>
        <p><strong>Business Address:</strong> {adminDetails.businessAddress}</p>
        <p><strong>Business Type:</strong> {adminDetails.businessType}</p>
        <p><strong>Contact Number:</strong> {adminDetails.businessContactNo}</p>
      </div>
    </div>
    
  );
};

export default AdminDetails;
