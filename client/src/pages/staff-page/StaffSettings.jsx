import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '@/UserContext';
import { baseUrl } from '@/Url';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { StaffSidebar } from './StaffSidebar';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function StaffDetails() {
  const [staffDetails, setStaffDetails] = useState(null);
  const [businessContactNo, setBusinessContactNo] = useState('')
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');;
  const [error, setError] = useState(''); // Define error state here
  const { user, ready  } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [logo, setLogo] = useState({ link: '' });

  if (!ready) return <p>Loading...</p>;
  if (!user) return <p>You must be logged in to access this page.</p>;

   // Load existing logo from MongoDB when component mounts
   useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await axios.get(`${baseUrl}/staff-details/settings/getSystemLogo`); // Endpoint to get saved logo
        if (response.data.avatar) {
          setLogo({ link: response.data.avatar });
        }
      } catch (error) {
        console.error('Failed to load logo:', error);
      }
    };
    fetchLogo();
  }, []);

  // Handle file selection and upload to AWS
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
  // Save the logo data to MongoDB
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await axios.post(`${baseUrl}/staff-details/settings/addSystemLogo`, { 
        avatar: logo.link,
      });

      toast.success('Settings saved successfully');
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
    const fetchStaffDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/staff-details`, {
          withCredentials: true, // Send cookies with the request
        });
        setStaffDetails(response.data);
      } catch (error) {
        console.error('Error fetching admin details:', error);
      }
    };

    fetchStaffDetails();
  }, [user.token]);

  function inputHeader(text) {
    return (
        <h2 className="text-2xl mt-4 mb-1">{text}</h2>
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
            `${baseUrl}/staff-details/set-password`,
            { newPassword },
            { withCredentials: true }
        );
        console.log('Password updated successfully:', response.data);
        setUpdateMessage(response.data.message);
        setPasswordError('');
    } catch (error) {
        console.error('Error updating password:', error);
        // Extract error message from response if available
        const errorMessage = error.response?.data?.message || 'Failed to update password.';
        setPasswordError(errorMessage);
    }
};


  if (!staffDetails) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen">
      <StaffSidebar className="min-h-screen" />
      <div className="flex-1 p-10">
        <h1>Travel Agency Details</h1>
        <div className="grid grid-cols-2 gap-6"> 
          {/* Left Column */}
          <div>
            <div className="flex flex-col items-center justify-center">
              {logo.link ? (
                <img
                  src={logo.link}
                  key={logo.link}
                  className="w-40 h-40 rounded-full object-cover"
                  alt="Travel Agency Logo"
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
            <button className='mt-2 w-full primary hover:shadow-lg transition duration-300 ease-in-out' 
              onClick={handleSave} disabled={isSaving || isUploading}>
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <div className="grid grid-cols-2 gap-4"> 
              <div>
                {preInput('Owner First Name')}
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Owner First Name"
                  value={staffDetails.firstName}
                  disabled
                />
              </div>
              <div>
                {preInput('Owner Last Name')}
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Owner Last Name"
                  value={staffDetails.lastName}
                  disabled
                />
              </div>
            </div>
            <div>
                {preInput('Owner Mobile No.')}
                <PhoneInput
                  className=" mt-2 mb-2 w-full px-3 py-2 border border-gray-300 rounded-2xl"
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="PH"
                  placeholder="Enter phone number"
                  value={staffDetails.contactNo}
                  onChange={handlePhoneNumberChange}
                  disabled
                />
              </div>

              {preInput('Business Email')}
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Business Email"
                value={staffDetails.email}
                disabled
              />
              
            <div className="relative mt-4">
                {preInput('Set new password')}
                <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                />
                <div
                    className="absolute bottom-3 right-3 cursor-pointer text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </div>
            </div>  
            
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            {updateMessage && <p className="text-green-500 mt-2">{updateMessage}</p>}
            <button
              onClick={handleUpdatePassword}
              className="mt-4 px-4 w-full py-2 primary text-white rounded hover:shadow-lg transition duration-300 ease-in-out"
            >
              Update Password
            </button>
          </div>
        </div>        
      </div>
    </div>
  ); 
};
