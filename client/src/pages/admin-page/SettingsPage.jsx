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
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [error, setError] = useState(''); // Define error state here
  const { updateUserRequiresPasswordChange } = useContext(UserContext);
  const { user, ready  } = useContext(UserContext);

  if (!ready) return <p>Loading...</p>;
  if (!user) return <p>You must be logged in to access this page.</p>;

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

   // Function to update the password
   const handleUpdatePassword = async () => {
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      return;
    }
    try {
      const response = await axios.put(
        `${baseUrl}/admin-details/set-password`,
        { newPassword },
        { withCredentials: true }
      );
      console.log('Password updated successfully:', response.data);
      setUpdateMessage(response.data.message);
      setPasswordError('');

      // Update UserContext to reflect password change requirement
      updateUserRequiresPasswordChange(false);
    } catch (error) {
      console.error('Error updating password:', error);
      setPasswordError('Failed to update password.');
    }
  };

  if (!adminDetails) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen">
      <MultiLevelSidebar className="min-h-screen" />
      <div className="flex-1 p-10">
        <h1>Admin Details</h1>
        <div className="grid grid-cols-2 gap-6"> {/* Create a 2-column grid */}
          {/* Left Column */}
          <div>
          <div className="grid grid-cols-2 gap-4"> {/* Nested grid for first and last name */}
            <div>
              {preInput('Owner First Name')}
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Owner First Name"
                value={adminDetails.ownerFirstName}
                disabled
              />
            </div>
            <div>
              {preInput('Owner Last Name')}
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Owner Last Name"
                value={adminDetails.ownerLastName}
                disabled
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
              <div>
                {preInput('Owner Mobile No.')}
                <PhoneInput
                  className=" mt-2 mb-2 w-full px-3 py-2 border border-gray-300 rounded-2xl"
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="PH"
                  placeholder="Enter phone number"
                  value={adminDetails.ownerMobileNum}
                  onChange={handlePhoneNumberChange}
                  disabled
                />
              </div>
              <div>
                {preInput('Business Mobile No.')}
                <PhoneInput
                  className=" mt-2 mb-2 w-full px-3 py-2 border border-gray-300 rounded-2xl"
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="PH"
                  placeholder="Enter phone number"
                  value={adminDetails.businessContactNo}
                  onChange={handlePhoneNumberChange}
                  disabled
                />
              </div>
            </div>
            {preInput('BIR Certificate')}
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={adminDetails.birCertificateDocu}
              disabled
            />
            
            {preInput('DTI Permit')}
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Business Type"
              value={adminDetails.dtiPermitDocu}
              disabled
            />
            {preInput('Mayors Permit')}
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Business Type"
              value={adminDetails.mayorsPermitDocu}
              disabled
            />
            {preInput('Business Permit')}
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Business Type"
              value={adminDetails.businessPermitDocu}
              disabled
            />
  
            {preInput('Set new password')}
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            {/* Button to update password */}
            <button
              onClick={handleUpdatePassword}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Update Password
            </button>
      
            {/* Success or error message */}
            {updateMessage && <p className="text-green-500 mt-2">{updateMessage}</p>}
          </div>
  
          {/* Right Column */}
          <div>
          
            {preInput('Business Name')}
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Business Name"
                value={adminDetails.businessName}
                disabled
              />
    
              {preInput('Business Email')}
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Business Email"
                value={adminDetails.businessEmail}
                disabled
              />
    
              {preInput('Business Address')}
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Business Address"
                value={adminDetails.businessAddress}
                disabled
              />
            <div className="grid grid-cols-2 gap-4">
              <div>
                {preInput('Business Branch')}
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Business Type"
                    value={adminDetails.businessBranch}
                    disabled
                  />
              </div>
              <div>
                {preInput('Business Type')}
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Business Type"
                    value={adminDetails.businessType}
                    disabled
                  />
              </div>
            </div>
          </div>
        </div>        
      </div>
    </div>
  );
    
};
