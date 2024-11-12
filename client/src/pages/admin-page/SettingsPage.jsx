import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '@/UserContext';
import { MultiLevelSidebar } from '@/components/admin-components/AdminSidebar';
import { baseUrl } from '@/Url';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function AdminDetails() {
  const [adminDetails, setAdminDetails] = useState(null);
  const [businessContactNo, setBusinessContactNo] = useState('');
  const [error, setError] = useState(''); // Define error state here
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

  function inputHeader(text) {
    return (
        <h2 className="text-2xl mt-4">{text}</h2>
    );
  }

  function inputDescription(text) {
    return (
        <p className="text-gray-500 text-sm">{text}</p>
    );
  }

  function preInput(header, description) {
    return (
        <>
            {inputHeader(header)}
            {inputDescription(description)}
        </>
    );
  }  

  const handlePhoneNumberChange = (value) => {
    setBusinessContactNo(value);
    
    // Validate the phone number based on the country
    if (value && !isValidPhoneNumber(value)) {
        setError("Invalid phone number format for the selected country.");
    } else {
        setError('');
    }
  };

  if (!adminDetails) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen">
      <MultiLevelSidebar className="min-h-screen" />
      <div className='flex-1 p-10'>
        <h1>Admin Details</h1>
        {preInput('Business Name')}
          <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Username"
              value={adminDetails.businessName}
              onChange={ev => setStaffName(ev.target.value)}
              disabled
          />
        {preInput('Business Email')}
          <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Username"
              value={adminDetails.businessEmail}
              onChange={ev => setStaffName(ev.target.value)}
              disabled
          />
        {preInput('Business Address')}
          <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Username"
              value={adminDetails.businessAddress}
              onChange={ev => setStaffName(ev.target.value)}
              disabled
          />
        {preInput('Business Type')}
          <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Username"
              value={adminDetails.businessType}
              onChange={ev => setStaffName(ev.target.value)}
              disabled
          />
        {preInput('Contact Number')}
          <PhoneInput
              className="phone-input-container mt-2 mb-2 w-full px-3 py-2 border border-gray-300 rounded-2xl"
              international
              countryCallingCodeEditable={false}
              defaultCountry="PH"
              placeholder="Enter phone number"
              value={adminDetails.businessContactNo}
              onChange={handlePhoneNumberChange}
          />{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      </div>
    </div>
  );
};
