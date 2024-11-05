import axios from "axios";
import { useState } from "react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { MultiLevelSidebar } from "../admin-components/AdminSidebar";
import { baseUrl } from "@/Url";

export default function CreateStaffAccount() {
    const [name, setStaffName] = useState('');
    const [password, setStaffPassword] = useState('');
    const [email, setStaffEmail] = useState('');
    const [address, setAddress] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [role] = useState('staff');  

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

    // Function for sending registration data to API
    async function addNewStaff(ev) {
        ev.preventDefault();
        try {
            await axios.post(`${baseUrl}/create-staff`, {
                name,
                email,
                password,
                address,
                contactNo,
                role 
            });
            alert('Staff Account Created Successfully!. Now you can log in');
        } catch (e) {
            alert('Staff Account Createion failed. Please try again later');
        }
    }

    return (
        <div className="flex min-h-screen">
            <MultiLevelSidebar className="min-h-screen" />
            <div className="flex-1 p-8">
                <div className="border bg-white shadow-lg rounded-xl p-6 flex gap-8">
                    <div className="flex flex-col w-1/2">
                        {preInput('Username', 'Input staff username')}
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Username"
                            value={name}
                            onChange={ev => setStaffName(ev.target.value)}
                        />
        
                        {preInput('Password', 'Input staff password')}
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Password"
                            value={password}
                            onChange={ev => setStaffPassword(ev.target.value)}
                        />
                    </div>
        
                    <div className="flex-grow w-1/2">
                        {preInput('Email', 'Input staff email')}
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="your@email.com"
                            value={email}
                            onChange={ev => setStaffEmail(ev.target.value)}
                        />
                        {preInput('Address', 'Input staff address')}
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="(street, city, province)"
                            value={address}
                            onChange={ev => setAddress(ev.target.value)}
                        />
                        {preInput('Phone number', 'Input staff phone number')}
                        <PhoneInput
                            className="phone-input-container mt-2 mb-2 w-full px-3 py-2 border border-gray-300 rounded-2xl"
                            international
                            countryCallingCodeEditable={false}
                            defaultCountry="PH"
                            placeholder="Enter phone number"
                            value={contactNo}
                            onChange={setContactNo}
                        />
                        <button onClick={addNewStaff} className="w-full p-2 bg-primary text-white rounded-2xl"> Register </button>
                    </div>
                </div>
            </div>
        </div>
    );    
}
