import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import axios from 'axios';
import { baseUrl } from '@/Url';

export default function UpdateStaff_Admin({ updatedData, setUpdatedData, setEditMode, staffId }) {
    const [contactNo, setContactNo] = useState(updatedData.contactNo);
    const [oldPassword, setOldPassword] = useState(''); // State for old password
    const [newPassword, setNewPassword] = useState(''); // State for new password

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the payload for updating staff data
        const updatePayload = {
            ...updatedData,
            oldPassword, // Send the old password for verification
            newPassword  // Send the new password for updating
        };

        // Ensure staffId is defined before making the request
        if (!staffId) {
            console.error('Staff ID is undefined');
            return; // Prevent the request
        }

        try {
            // Send request to update staff data, including password if applicable
            const response = await axios.put(`${baseUrl}/create-staff/${staffId}`, updatePayload, { withCredentials: true });
            console.log('Update successful:', response.data);

            // Optionally, reset password fields after successful update
            setOldPassword('');
            setNewPassword('');
            setEditMode(false); // Exit edit mode after saving
            alert('Staff data updated successfully!');
        } catch (error) {
            alert('Failed to update staff data. Please try again later.');
            console.error('Error updating staff member:', error.response?.data || error.message);
        }
    };

    return (
        <div >
            <div className="border bg-white shadow-lg rounded-xl p-6 flex gap-8">
                <div className="flex flex-col w-1/2">
                    {preInput('Username', 'Update staff username')}
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Username"
                        value={updatedData.name}
                        onChange={e => setUpdatedData({ ...updatedData, name: e.target.value })}
                    />

                    {preInput('Old Password', 'Enter your current password')}
                    <input
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                    />

                    {preInput('New Password', 'Enter a new password (optional)')}
                    <input
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />
                </div>

                <div className="flex-grow w-1/2">
                    {preInput('Email', 'Update staff email')}
                    <input
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="your@email.com"
                        value={updatedData.email}
                        onChange={e => setUpdatedData({ ...updatedData, email: e.target.value })}
                    />

                    {preInput('Address', 'Update staff address')}
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="(street, city, province)"
                        value={updatedData.address}
                        onChange={e => setUpdatedData({ ...updatedData, address: e.target.value })}
                    />

                    {preInput('Phone number', 'Update staff phone number')}
                    <PhoneInput
                        className="phone-input-container mt-2 mb-2 w-full px-3 py-2 border border-gray-300 rounded-2xl"
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="PH"
                        placeholder="Enter phone number"
                        value={contactNo}
                        onChange={(value) => {
                            setContactNo(value);
                            setUpdatedData({ ...updatedData, contactNo: value });
                        }}
                    />

                    <div className="flex justify-end mt-4">
                        <button type="submit" className="w-full p-2 bg-primary text-white rounded-2xl shadow-none hover:shadow-md hover:shadow-gray-400 transition-shadow"
                            onClick={handleSubmit}>
                            Save
                        </button>
                        <button type="button" className="w-full p-2 bg-gray-500 text-white rounded-2xl ml-4 shadow-none hover:shadow-md hover:shadow-gray-400 transition-shadow"
                            onClick={() => setEditMode(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
